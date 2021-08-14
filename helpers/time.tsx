export const timeFiveMinutes = () => {
  return new Date().setMinutes(new Date().getMinutes() + 5);
};

export const timeFifteenMinutes = () => {
  return new Date().setMinutes(new Date().getMinutes() + 15);
};

export const secondsToMinutesString = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  return `${padLeft(minutes, "0", 2)}:${padLeft(seconds % 60, "0", 2)}`;
};

const padLeft = (string, pad, length) => {
  return (new Array(length + 1).join(pad) + string).slice(-length);
};
