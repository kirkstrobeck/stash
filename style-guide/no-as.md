# No `as`

Let’s not use `as` if at all possible, which is most of the time

## Instead

1. Work out the upstream issues that make your thing not typed

1. Use `String()`, or `!!`, or `Boolean(`, etc. to change the type in JavaScript

## Why?

1. The TypeScript compiler knows best. If I handed you a `cat as Dog`, I’m pretty sure you would know it’s still a cat; In other words, we don’t know best, but TypeScript does and with programmatic accuracy

1. It might seem like a gentle type change, but you are actually forcefully overriding the compiler

1. Since you’re overriding the compiler, places where we use `as` are some of the most likely places we’ll find bugs in the future; Hard to find bugs, too, because the compiler can’t help us

## Notes

`types` > `as` > `ts-ignore`

[Reference](https://github.com/kirkstrobeck/stash/blob/main/style-guide/no-as.md)
