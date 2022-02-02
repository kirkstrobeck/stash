const base = <T>(
  condition: () => T,
  {
    attemptsMax = 500,
  }: {
    attemptsMax?: number;
  } = {},
): Promise<T> =>
  new Promise((resolve, reject) => {
    const result = condition();
    if (result) resolve(result);

    let attempts = 1;

    const interval = window.setInterval(() => {
      const intervalResult = condition();
      attempts += 1;

      const isTooManyAttempts = attempts > attemptsMax;

      if (intervalResult || isTooManyAttempts) {
        window.clearInterval(interval);
      }

      if (intervalResult) {
        resolve(intervalResult);
      } else if (isTooManyAttempts) {
        reject();
      }
    }, 100);
  });

export default base;
