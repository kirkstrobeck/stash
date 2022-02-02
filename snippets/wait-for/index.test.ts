import { waitFor } from '@testing-library/react';

import base from '.';

test('', async () => {
  const foo = 'foo';

  expect(await base(() => foo)).toEqual('foo');
});

test('', async () => {
  let foo = '';

  setTimeout(() => {
    foo = 'foo';
  }, 1000);

  expect(await base(() => foo)).toEqual('foo');
});

test('', async () => {
  await waitFor(() =>
    expect(
      base(() => false, {
        attemptsMax: 3,
      }),
    ).rejects.toEqual(undefined),
  );
});
