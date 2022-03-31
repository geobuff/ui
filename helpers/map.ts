import * as Maps from "@geobuff/svg-maps";

import { Option } from "../types/option";

export const getHighlightRegionsByMap = (map: string): Option[] => {
  const selectedMap = Maps[map];

  if (selectedMap !== undefined) {
    return selectedMap.paths.map(({ id, name }) => ({
      value: id,
      label: name,
    }));
  }
};
