import { Mapping } from "../types/mapping";
import { Result } from "../types/result";

export const mergeArrayByName = (
  mapping: Mapping[],
  checked: Result[]
): Mapping[] =>
  mapping.map((x) => ({
    ...checked.find((item) => item.name === x.name && item),
    ...x,
  }));
