import { mergeArrayByName } from "./array";

export const getResults = (mapping, checked, hasGameStopped) => {
  return hasGameStopped
    ? mapping.map((x) => {
        return {
          ...x,
          isHidden: false,
          isMissedResult: !checked.map((x) => x.name).includes(x.name),
        };
      })
    : mergeArrayByName(mapping, checked).map((x) => {
        return {
          ...x,
          isHidden: !checked.map((x) => x.name).includes(x.name),
          isMissedResult: false,
        };
      });
};
