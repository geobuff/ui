/* eslint-disable @typescript-eslint/no-explicit-any */

import { Mapping } from "../types/mapping";

export const groupMapping = (mapping: Mapping[]): any => {
  return mapping.reduce((r, a) => {
    r[a.group] = r[a.group] || [];
    r[a.group].push(a);
    return r;
  }, Object.create(null));
};
