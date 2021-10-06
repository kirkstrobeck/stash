# No `null`

Let’s not use `null`

## Instead

1. Use implicit `undefined` or, if needed, an explicit `undefined`

1. `typeof null === 'object'`, `typeof undefined === 'undefined'`. `null` behaves in different ways, so it increases complexity because it’s not nothing, but similar to nothing

## Links

(disclaimer: I haven’t seen/read all of everything below):

1. https://softwareengineering.stackexchange.com/a/12836/13256

1. https://medium.com/@hbarcelos/why-i-banned-null-from-my-js-code-and-why-you-should-too-13df90323cfa

1. Elm removes null as a thing https://rundis.github.io/blog/2016/elm_maybe.html (more https://youtu.be/kEitFAY7Gc8?t=405)

1. https://writingjavascript.com/why-you-should-always-use-undefined-and-never-null

1. https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/

[Reference](https://github.com/kirkstrobeck/stash/blob/main/style-guide/no-null.md)
