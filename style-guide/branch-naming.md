# Branch naming

As developers it’s important that we engage our brains on the things that matter and not the things that don’t. This goes back to the whole conversation of signal vs noise

For us to be effective, we must focus on the things that have actual impact

1. Avoid branch naming requirements
    1. It’s not meaningful to be failed/rejected for a branch name as it doesn’t improve what you actually ship
    1. There are enough ways to fail, e.g., unit tests, linting, etc. you don’t need to add another failure point
    1. If the branch includes an issue number or description, then when something changes the title and the branch name needs to change because there are multiple sources of truth -- e.g., If the branch intent pivots you need to rename the branch to something more meaningful and open up a new PR, oi!
1. You shouldn’t think about branch names, it’s not a valuable use of time and energy, focus on the code
1. Your collegues shouldn’t care what the branch is named as nobody should be looking at branch name as a source of truth
1. This precludes potential optimizations like the following git scripts that significantly improved my workflows -- https://github.com/kirkstrobeck/stash/tree/main/scripts/git -- Specifically, I can just say `new-feature-branch` and it will create a new branch based on latest main called `feature-[current timestamp]`

Additionally, nearly every one of my commits, as I got better at coding, was just "progress". Because commit messages don’t matter either, they’re just squashed and bye. I realized I had to take time, stop, think, and summarize my work every time I wanted to commit -- All of which adds zero value to the end user -- It also introduces pain that I want to avoid, which meant fewer commits and a more dangerous working state -- Better to bias for saving work -- When was the last time you saved a Word, Excel, etc. doc and had to think about what to write before you could save your doc? It’s not a thing, it’s just "Save", that’s great!

What are the things that do matter?

1. The code
1. Passing checks
1. PR title
1. PR description
1. Thoughtful and meaningful PR comments/discussion/etc

Everything else is noise
