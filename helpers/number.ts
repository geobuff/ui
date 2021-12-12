export const formatNumber = (value: number): string =>
  value.toLocaleString("en-US", { maximumFractionDigits: 2 });

export const toTwoDecimalPlaces = (value: number): number =>
  Math.round(value * 100) / 100;
