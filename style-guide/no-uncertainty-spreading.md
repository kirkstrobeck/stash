# No uncertainty spreading

If you have a thing that introduces uncertainty and you see that it’s churning up unnecessary complexity, then address it upstream

## Example

1. `foo?: Function` as an export

1. 10 files that import `foo` and need to implement it as `if (foo) foo()`; Every time is another branch that requires testing

1. Better to address it upstream and export `foo: Function`

## Why?

1. Reduces unnecessary branching

1. Reduces complexity

1. Solves the problem in the right place

1. Less code coverage work and potential deficit

[Reference](https://github.com/kirkstrobeck/stash/blob/main/style-guide/no-uncertainty-spreading.md)
