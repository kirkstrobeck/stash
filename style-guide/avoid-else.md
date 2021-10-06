# Avoid `else`

Let’s not use `else` here (or `:` if ternary)

## Instead

1. State a success condition(s) with an early return(s)

1. Have the error case be the last

## Example

```tsx
// no
return isAllGood ? <GoldenTicket /> : <Fail />;

// yes
if (isAllGood) return <GoldenTicket />;

return <Fail />;
```

## Why?

1. It’s not as easy to read as it could be; Having the success cases be exit ramps means that you may only need to read a portion of the code versus needing to understand everything that’s going on. It’s also easy to what happens in a fail case; it’s just the stuff at the end

1. The two conditions seem unrelated. e.g., It makes sense when saying color should be green or blue, but success or failure seem like different things

1. (for ternary) If the code needs to support another condition, it needs to be rewritten in an expanded way

1. It avoids an unnecessary closure (if using `else`)

[Reference](https://github.com/kirkstrobeck/stash/blob/main/style-guide/no-as.md)
