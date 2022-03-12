import { Mapping } from "../types/mapping";

export const mergeArrayByName = (
  mapping: Mapping[],
  checked: Mapping[]
): Mapping[] =>
  mapping.map((x) => ({
    ...checked.find((item) => item.name === x.name && item),
    ...x,
  }));

export const insert = (
  arr: Array<any>,
  index: number,
  newItem: Record<any, any> | Array<any>
): Array<any> => [...arr.slice(0, index), newItem, ...arr.slice(index)];
