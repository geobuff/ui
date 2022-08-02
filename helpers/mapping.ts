import { MappingEntry } from "../types/mapping-entry";

export const groupMapping = (mapping: MappingEntry[]): any => {
  return mapping
    .sort((a, b) => a.grouping.localeCompare(b.grouping))
    .reduce((r, a) => {
      r[a.grouping] = r[a.grouping] || [];
      r[a.grouping].push(a);
      return r;
    }, Object.create(null));
};
