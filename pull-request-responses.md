## No `null`

Let’s avoid `null` and instead use implicit `undefined` or, if needed, an explicit `undefined`.

`typeof null === 'object'`, `typeof undefined === 'undefined'`. `null` behaves in so many different ways, so it increases complexity because it’s not nothing, it’s a thing similar to nothing.

Here are some resources (disclaimer: I haven’t seen/read all of everything below):

- https://softwareengineering.stackexchange.com/a/12836/13256
- https://medium.com/@hbarcelos/why-i-banned-null-from-my-js-code-and-why-you-should-too-13df90323cfa
- Elm removes null as a thing https://rundis.github.io/blog/2016/elm_maybe.html (more https://youtu.be/kEitFAY7Gc8?t=405)
- https://writingjavascript.com/why-you-should-always-use-undefined-and-never-null
- https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/

[No `null`](https://github.com/kirkstrobeck/stash/blob/main/pull-request-responses.md#no-null)
