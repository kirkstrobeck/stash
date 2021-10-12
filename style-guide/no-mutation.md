# No mutation

Let’s not mutate if at all possible, which is most of the time

## Instead

1. Define a new `const`

2. Handle things inline

## Example

### Bad

```ts
const globalState = {};

const updateState = (localState, addThis) => {
  const newState = Object.assign(localState, addThis);

  return newState;
};

const aState = updateState(globalState, { a: true });

// expected
console.log(aState); // a: true

const bState = updateState(globalState, { b: true });

// Oi! MUTATION!
console.log(bState); // a:true, b:true
```

### Good

```ts
const globalState = {};

const updateState = (localState, addThis) => {
  const newState = Object.assign({}, localState, addThis); // <--- see the `{}`!

  return newState;
};

const aState = updateState(globalState, { a: true });

// expected
console.log(aState); // a: true

const bState = updateState(globalState, { b: true });

// Oi! MUTATION!
console.log(bState); // b:true
```

## Why?

1. Mutation is the sneakiest code possible and is responsible for manifesting errors and complexity

1. Avoiding mutation is ideal; Programatically is best, by convention is second best

[Reference](https://github.com/kirkstrobeck/stash/blob/main/style-guide/no-mutation.md)
