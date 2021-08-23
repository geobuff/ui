export const toMinTwoDigits = (time) =>
  time.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
