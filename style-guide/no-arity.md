# No arity

Let’s avoid arity for function inputs if at all possible, which is most of the time

## Instead

Use one object parameter

## Why?

1. The API can change over time without introducing any implementation overhead

1. Folks don’t need to use a placeholder value to specify a later value; e.g. `thing(undefined, undefined, true)`

## Example

```ts
const deriveName = (first: string, middle: string, last: string) =>
  first + " " + middle + " " + last;
```

```ts
const deriveName = ({
  first,
  middle,
  last,
}: {
  first: string;
  middle: string;
  last: string;
}) => first + " " + middle + " " + last;
```

## Links

- [Simplified JavaScript Jargon entry](http://jargon.js.org/_glossary/ARITY.md)

[Reference](https://github.com/kirkstrobeck/stash/blob/main/style-guide/no-arity.md)
