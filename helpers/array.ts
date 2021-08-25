import { Mapping } from "../types/mapping";
import { Result } from "../types/result";

export const mergeArrayByName = (
  mapping: Array<Mapping>,
  checked: Array<Result>
): Array<Mapping> =>
  mapping.map((x) => ({
    ...checked.find((item) => item.name === x.name && item),
    ...x,
  }));
