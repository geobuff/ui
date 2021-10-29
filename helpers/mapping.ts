/* eslint-disable @typescript-eslint/no-explicit-any */

import { Mapping } from "../types/mapping";

export const groupMapping = (mapping: Mapping[]): any => {
  const unordered = mapping.reduce((r, a) => {
    r[a.group] = r[a.group] || [];
    r[a.group].push(a);
    return r;
  }, Object.create(null));

  return Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
};
