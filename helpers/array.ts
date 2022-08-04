import { MappingEntry } from "../types/mapping-entry";

export const mergeArrayByName = (
  mapping: MappingEntry[],
  checked: MappingEntry[]
): MappingEntry[] =>
  mapping.map((x) => ({
    ...checked.find((item) => item.name === x.name && item),
    ...x,
  }));

export const insert = (
  arr: Array<any>,
  index: number,
  newItem: Record<any, any> | Array<any>
): Array<any> => [...arr.slice(0, index), newItem, ...arr.slice(index)];
