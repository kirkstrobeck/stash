# Make `booleans` optional

Let’s make `booleans` optional if at all possible, which is all of the time

## How?

1. Assume the most common case; e.g. the car has tires (`hasNoTires?`)

1. Then your code assumes tires, and you can field the other case(s) `if (hasNoTires) {`

## Why?

1. Everyone who uses your code doesn’t need to say `tires: true` .. it’s already got em by default and [defaults are amazing](https://github.com/kirkstrobeck/stash/blob/main/style-guide/defaults.md)

1. It makes `undefined` meaningful; If you don’t need to assert `true` or `false`, then you can test for `typeof foo === 'undefined'` and handle the unset case

[Reference](https://github.com/kirkstrobeck/stash/blob/main/style-guide/booleans-optional.md)
