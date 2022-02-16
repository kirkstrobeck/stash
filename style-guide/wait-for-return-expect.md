# `waitFor` must `return` a condition

Wrapping in `waitFor` is not sufficient; it needs to `return` a condition, so it knows if it’s passing or not

## Example

### Bad

```ts
await waitFor(() => { expect(mockAPI).toHaveBeenCalledTimes(1) })
```

this is [actually](https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=false&spec=false&loose=false&code_lz=O4QwlgLgYg9gTgCgQSgAQF4B8qDeBTADwAc8BjCBAWxlIGsBBABQElkA6CGACRADc8AQnjwA7AMIgANpLwATACphKeAM4IAjMgC-yIA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env&prettier=true&targets=Node-5&version=7.17.4&externalPlugins=&assumptions=%7B%7D)

```ts
use strict”;

waitFor(function () {
  expect(mockAPI).toHaveBeenCalledTimes(1);
});
```

### Good

```ts
await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1))
```

this is [actually](https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=false&spec=false&loose=false&code_lz=O4QwlgLgYg9gTgCgQSgAQF4B8qCmAPABxwGMIEBbGYgawEEAFASWQDoIYAJEANxwCEcOAHYBhEABtxOACYAVMORwBnBAEZkyIA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env&prettier=true&targets=Node-5&version=7.17.4&externalPlugins=&assumptions=%7B%7D)

```ts
use strict”;

waitFor(function () {
  return expect(mockAPI).toHaveBeenCalledTimes(1);
});
```

[Reference](https://github.com/kirkstrobeck/stash/blob/main/style-guide/wait-for-return-expect.md)
