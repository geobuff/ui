import * as Maps from "@geobuff/svg-maps";
import { Option } from "../types/option";
import { SVGBase } from "../types/svg-base";
import {
  GEOBUFF_BLUE,
  GEOBUFF_GREEN,
  GEOBUFF_GREY,
  GEOBUFF_LIGHT_BLUE,
  GEOBUFF_LIGHT_GREEN,
  GEOBUFF_RED,
} from "./colors";

const OCEAN_QUIZ_CLASSNAMES = ["UkSeas", "WorldOceans"];
const CIRCLE_QUIZ_CLASSNAMES = ["UkMajorCities"];
const IMAGE_QUIZ_CLASSNAMES = ["SevenSummits"];

export const getHighlightRegionsByMap = (map: string): Option[] => {
  const selectedMap: SVGBase = Maps[map];

  if (selectedMap !== undefined) {
    return selectedMap.elements
      .filter((x) => x.id)
      .map(({ svgName, name }) => ({
        value: svgName,
        label: name,
      }));
  }
};

export const getGameMap = (
  map: SVGBase,
  mapClassName: string,
  highlighted?: string
): any => {
  let result: SVGBase = JSON.parse(JSON.stringify(map));
  if (highlighted) {
    result = {
      ...result,
      elements: result.elements.map((x) => {
        if (!x.id) {
          x.style = { fill: GEOBUFF_GREY };
        } else if (x.name?.toLowerCase() === highlighted.toLowerCase()) {
          if (IMAGE_QUIZ_CLASSNAMES.includes(mapClassName)) {
            x.style = { opacity: 1 };
          } else {
            x.style = { fill: GEOBUFF_RED };
          }
        } else {
          x.style = {
            fill: OCEAN_QUIZ_CLASSNAMES.includes(mapClassName)
              ? GEOBUFF_LIGHT_BLUE
              : GEOBUFF_LIGHT_GREEN,
          };
        }
        return x;
      }),
    };
  }
  return result;
};

export const initializeMap = (map: SVGBase): void => {
  map.elements
    .filter((x) => !x.id)
    .map((x) => {
      x.style = { fill: GEOBUFF_GREY };
      return x;
    });
};

export const clearMapFill = (map: SVGBase, mapClassName: string): void => {
  if (CIRCLE_QUIZ_CLASSNAMES.includes(mapClassName)) {
    map.elements.map((x) => {
      if (x.id) {
        x.style = { fill: GEOBUFF_GREY };
      }
      return x;
    });
    return;
  }

  if (IMAGE_QUIZ_CLASSNAMES.includes(mapClassName)) {
    map.elements.map((x) => {
      if (x.id) {
        x.style = { opacity: 0 };
      }
      return x;
    });
    return;
  }

  map.elements.map((x) => {
    if (x.id) {
      x.style = {};
    }
    return x;
  });
};

export const updateMapOnSuccessfulSubmission = (
  map: SVGBase,
  mapClassName: string,
  submission: string,
  pathSelectedFill: string
): void => {
  if (IMAGE_QUIZ_CLASSNAMES.includes(mapClassName)) {
    map.elements
      .filter((x) => x.name?.toLowerCase() === submission)
      .map((x) => {
        x.style = { opacity: 1 };
        return x;
      });
  } else {
    map.elements
      .filter((x) => x.name.toLowerCase() === submission)
      .map((x) => {
        x.style = { fill: pathSelectedFill };
        return x;
      });
  }
};

export const getMapStyles = (map: string): any => {
  return {
    height: "100%",
    width: "100%",
    fill: OCEAN_QUIZ_CLASSNAMES.includes(map)
      ? GEOBUFF_LIGHT_BLUE
      : GEOBUFF_LIGHT_GREEN,
  };
};

export const getInitialMapFill = (map: string): string =>
  OCEAN_QUIZ_CLASSNAMES.includes(map)
    ? GEOBUFF_LIGHT_BLUE
    : GEOBUFF_LIGHT_GREEN;

export const getPathSelectedFill = (map: string): string =>
  OCEAN_QUIZ_CLASSNAMES.includes(map)
    ? GEOBUFF_BLUE
    : CIRCLE_QUIZ_CLASSNAMES.includes(map)
    ? GEOBUFF_RED
    : GEOBUFF_GREEN;
