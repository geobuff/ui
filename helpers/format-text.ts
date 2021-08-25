export const toMinTwoDigits = (time: number): string =>
  time.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
