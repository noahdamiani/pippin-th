export const doTimes =
  (times: number) => (callback: (index?: number) => void) => {
    for (let i = 0; i < times; i++) {
      callback(i);
    }
  };
