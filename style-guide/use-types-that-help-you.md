# Use types that help you

Let’s avoid using types that don’t add value;

## Instead

1. Omit them

## Why?

1. The TypeScript compiler will figure it out

1. It’s overhead to read and understand

1. The code may be more capable than you think; Adding a type limitation may inhibit innovation

## Example

### Bad

```ts
// export const importedFoo: Foo = { message: 'Yo!' }

const foo: Foo = importedFoo() as Foo;
```

[Reference](https://github.com/kirkstrobeck/stash/blob/main/style-guide/use-types-that-help-you.md)
