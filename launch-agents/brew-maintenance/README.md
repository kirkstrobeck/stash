# brew-maintenance

Keeps Homebrew updated on your Mac automatically, twice a day.
Paste this into your coding agent (Claude Code, Codex, etc.):

```
Install https://github.com/kirkstrobeck/stash/blob/main/launch-agents/brew-maintenance/README.md
```

---

## For the agent

Install a launchd job that runs `brew update && brew upgrade && brew cleanup`
about twice a day, optionally only on the user's home network.
Follow these steps in order. Do not skip verification.

### 1. Check prerequisites

- macOS only. Confirm with `uname -s` → `Darwin`.
- `BREW_PATH` = absolute output of `command -v brew` (`/opt/homebrew/bin/brew` or
  `/usr/local/bin/brew`). If missing, stop and tell the user to install Homebrew.

### 2. Ask the user one question

"Should maintenance run only on your current network (e.g. home Wi-Fi), or anywhere?"

- **Only this network:** set `ROUTER_MAC` to the current default gateway's MAC:
  ```sh
  gw=$(route -n get default | awk '/gateway:/{print $2}')
  ping -c1 -t1 "$gw" >/dev/null; arp -n "$gw" | awk '{print $4}'
  ```
  Normalize to lowercase, zero-padded octets (`90:CA:FA:B:27:B1` → `90:ca:fa:0b:27:b1`).
  Why MAC and not Wi-Fi name: on modern macOS the SSID is hidden from background
  launchd jobs (Location Services gating), so an SSID check silently never matches.
- **Anywhere:** set `ROUTER_MAC` to the empty string.

### 3. Write the script

Write this to `~/Library/Scripts/brew-maintenance.zsh`, replacing `__BREW_PATH__`
and `__ROUTER_MAC__` with the values from steps 1–2. Then `chmod +x` it.

```zsh
#!/bin/zsh
# Homebrew maintenance, run by launchd. Source: github.com/kirkstrobeck/stash
# Self-throttles to once per MIN_GAP_HOURS via a last-success stamp, so the
# hourly launchd poll yields ~twice-daily runs and catches up after sleep.
# If ROUTER_MAC is set, runs only when the default gateway has that MAC.
#
# Exit codes: 0 ran or skipped, 1 brew missing, 2 brew reported an error.
set -u

readonly ROUTER_MAC="${BREW_MAINT_ROUTER_MAC-__ROUTER_MAC__}"
readonly MIN_GAP_HOURS="${BREW_MAINT_MIN_GAP_HOURS:-11}"
readonly BREW="__BREW_PATH__"
readonly LOG="$HOME/Library/Logs/brew-maintenance.log"
readonly STAMP="$HOME/Library/Logs/brew-maintenance.last-success"
readonly STATE="$HOME/Library/Logs/brew-maintenance.last-skip"

log() { print -r -- "$(date '+%Y-%m-%d %H:%M:%S')  $*" >>"$LOG"; }

# Log a skip reason only when it changes, so hourly polling doesn't spam.
note_skip() {
  local prev=""
  [ -f "$STATE" ] && prev=$(cat "$STATE" 2>/dev/null)
  [ "$1" = "$prev" ] && return 0
  print -r -- "$1" >"$STATE"
  log "$1"
}

normalize_mac() {
  local oct out=""
  for oct in "${(@s/:/)1}"; do
    oct=${(L)oct}
    (( ${#oct} == 1 )) && oct="0$oct"
    out="$out:$oct"
  done
  print -r -- "${out#:}"
}

router_mac() {
  local gw
  gw=$(route -n get default 2>/dev/null | awk '/gateway:/{print $2; exit}')
  [ -n "$gw" ] || return 0
  ping -c1 -t1 "$gw" >/dev/null 2>&1
  normalize_mac "$(arp -n "$gw" 2>/dev/null | awk '{print $4; exit}')"
}

on_allowed_network() {
  [ -z "$ROUTER_MAC" ] && return 0
  local mac
  mac=$(router_mac)
  [ "$mac" = "$ROUTER_MAC" ] && return 0
  note_skip "SKIP not on home network (router: ${mac:-none})"
  return 1
}

due() {
  local last=0 elapsed
  [ -f "$STAMP" ] && last=$(cat "$STAMP" 2>/dev/null)
  [[ "$last" == <-> ]] || last=0
  elapsed=$(( $(date +%s) - last ))
  (( elapsed >= MIN_GAP_HOURS * 3600 )) && return 0
  note_skip "SKIP throttled ($(( elapsed / 3600 ))h since last run, need ${MIN_GAP_HOURS}h)"
  return 1
}

run_maintenance() {
  log "START"
  "$BREW" update >>"$LOG" 2>&1 \
    && "$BREW" upgrade >>"$LOG" 2>&1 \
    && "$BREW" cleanup >>"$LOG" 2>&1 || {
      log "ERROR brew maintenance failed (see output above)"
      return 2
    }
  date +%s >"$STAMP"
  rm -f "$STATE"
  log "DONE maintenance complete"
}

main() {
  [ -x "$BREW" ] || { log "ERROR brew not found at $BREW"; return 1; }
  on_allowed_network || return 0
  due || return 0
  run_maintenance
}

main "$@"
```

### 4. Write the launchd plist

Write this to `~/Library/LaunchAgents/com.stash.brew-maintenance.plist`,
replacing `__HOME__` with the absolute home directory (launchd does not expand `~`).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.stash.brew-maintenance</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/zsh</string>
    <string>__HOME__/Library/Scripts/brew-maintenance.zsh</string>
  </array>
  <!-- Preferred slots 9:00 and 21:00; hourly poll + RunAtLoad catch up
       after sleep. The script throttles itself, so extra wakes are cheap. -->
  <key>StartCalendarInterval</key>
  <array>
    <dict><key>Hour</key><integer>9</integer><key>Minute</key><integer>0</integer></dict>
    <dict><key>Hour</key><integer>21</integer><key>Minute</key><integer>0</integer></dict>
  </array>
  <key>StartInterval</key><integer>3600</integer>
  <key>RunAtLoad</key><true/>
  <key>StandardOutPath</key><string>__HOME__/Library/Logs/brew-maintenance.log</string>
  <key>StandardErrorPath</key><string>__HOME__/Library/Logs/brew-maintenance.log</string>
</dict>
</plist>
```

Validate it: `plutil -lint ~/Library/LaunchAgents/com.stash.brew-maintenance.plist`.

### 5. Load it (idempotent; safe to re-run)

```sh
label=com.stash.brew-maintenance
launchctl bootout "gui/$(id -u)/$label" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" ~/Library/LaunchAgents/$label.plist
```

If an older copy exists under another label (any plist in `~/Library/LaunchAgents`
that runs a `brew-maintenance` script), boot it out and delete it and its old script
so two copies don't run.

### 6. Verify — required

1. Force a real run now: `launchctl kickstart -k "gui/$(id -u)/com.stash.brew-maintenance"`
2. Wait for it to finish (it can take minutes), then check
   `launchctl print "gui/$(id -u)/com.stash.brew-maintenance" | grep "last exit code"` → `0`
3. `tail -20 ~/Library/Logs/brew-maintenance.log` should end in `DONE` or a `SKIP` line.
   The run is throttled after one success; to force another, delete
   `~/Library/Logs/brew-maintenance.last-success`.

If it ends in `ERROR`, read the brew output above it and fix the cause; don't
leave the job failing. Common one: `It seems the App source '/Applications/X.app'
is not there` means the app was deleted by hand while brew still tracks it. Ask
the user whether to `brew uninstall --cask --force <cask>` or
`brew reinstall --cask <cask>`, then re-run the verification.

Report the final log lines to the user as proof.

## Uninstall

```sh
launchctl bootout "gui/$(id -u)/com.stash.brew-maintenance"
rm ~/Library/LaunchAgents/com.stash.brew-maintenance.plist ~/Library/Scripts/brew-maintenance.zsh
rm -f ~/Library/Logs/brew-maintenance.{log,last-success,last-skip}
```
