const base = (fn: Function, note?: string) =>
  new Promise((resolve) => {
    const result = fn();
    if (result) resolve(result);

    let attempts = 0;

    const interval = window.setInterval(() => {
      debugLog('`waitFor` interval run for:', note);

      const intervalResult = fn();
      attempts += 1;

      if (attempts > 500 || intervalResult) {
        window.clearInterval(interval);
        resolve(intervalResult);
      }
    }, 100);
  });

export default base;
