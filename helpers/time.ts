export const timeFiveMinutes = (): number => {
  return new Date().setMinutes(new Date().getMinutes() + 5);
};

export const timeFifteenMinutes = (): number => {
  return new Date().setMinutes(new Date().getMinutes() + 15);
};

export const secondsToMinutesString = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  return `${padLeft(minutes, "0", 2)}:${padLeft(seconds % 60, "0", 2)}`;
};

const padLeft = (input: number, pad: string, length: number) => {
  return (new Array(length + 1).join(pad) + input).slice(-length);
};
