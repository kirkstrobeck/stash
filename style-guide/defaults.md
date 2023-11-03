# Defaults

Defaults are amazing; use them. Specify as little as possible.

## Why?

1. You always get the latest and greatest implementation. The moment you assert a config or similar, you’ve locked up, perhaps, the best choice for today, but maybe not tomorrow. e.g., API says the default is `foo`, so you set `foo` in your code, API V2 offers `foo2` as the new default with support for `foo` .. you’re now stuck in `foo` until you update your code

1. Less to grok; Tell me what’s meaningful about your implementation by omitting the noise. If I see ten things and half of them are defaults, I still need to review all ten .. better to specify only the ones that make this thing unique

[Reference](https://github.com/kirkstrobeck/stash/blob/main/style-guide/defaults.md)
