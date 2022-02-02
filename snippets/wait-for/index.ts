const base = (
  condition: () => any,
  {
    attemptsMax = 500,
  }: {
    attemptsMax?: number;
  } = {},
) =>
  new Promise((resolve, reject) => {
    const result = condition();
    if (result) resolve(result);

    let attempts = 0;

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
