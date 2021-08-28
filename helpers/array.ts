import { Mapping } from "../types/mapping";

export const mergeArrayByName = (
  mapping: Mapping[],
  checked: Mapping[]
): Mapping[] =>
  mapping.map((x) => ({
    ...checked.find((item) => item.name === x.name && item),
    ...x,
  }));
