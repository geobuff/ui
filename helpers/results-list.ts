import { MappingEntry } from "../types/mapping-entry";
import { Result } from "../types/result";
import { mergeArrayByName } from "./array";

export const getResults = (
  mapping: MappingEntry[],
  checked: MappingEntry[],
  hasGameStopped: boolean
): Result[] => {
  return hasGameStopped
    ? mapping.map((x) => {
        return {
          name: x.name,
          code: x.code,
          flagUrl: x.flagUrl,
          svgName: x.svgName,
          isHidden: false,
          isMissedResult: !checked.map((x) => x.name).includes(x.name),
        };
      })
    : mergeArrayByName(mapping, checked).map((x) => {
        return {
          name: x.name,
          code: x.code,
          flagUrl: x.flagUrl,
          svgName: x.svgName,
          isHidden: !checked.map((x) => x.name).includes(x.name),
          isMissedResult: false,
        };
      });
};
