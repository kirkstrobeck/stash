# No warn / No warning

Don’t have warnings. Warnings don’t make sense. A thing is either an error or not.

## Instead

1. If a warning is meaningful then it should be an error, so that it must be addressed

2. If a warning is not meaningful then it should be ignored, otherwise it is noise

## Why?

1. In the discussion of signal versus noise, we should strive to reduce noise and grow signal. This is an easy way to do both.

2. When you boil it down, a warning is basically a way to persist a voice from the code that says you’re doing something wrong, but it’s also saying that it doesn’t matter, which leads one to say “So, which is it?! Pick a lane!”

[Reference](https://github.com/kirkstrobeck/stash/blob/main/style-guide/no-warn.md)
