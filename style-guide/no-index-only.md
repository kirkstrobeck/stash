# No index-only (barrel) files

Let’s avoid using `index` as a rollup of the folder contents

## Instead

1. Export from the file that has the thing you want to export

1. It’s ok for that file to be `index` if the folder name represents it

## Why?

1. Index-only files combine things that aren’t necessarily associated

1. It’s difficult to remove items or move them when the import is one statement

1. It’s another file that ships to the client and has no value

1. When you import from the thing directly, it’s easy to spot problems; e.g., If you’re using `list/item` outside of `List`, then `Item` should probably be moved or duplicated

[Reference](https://github.com/kirkstrobeck/stash/blob/main/style-guide/no-index-only.md)
