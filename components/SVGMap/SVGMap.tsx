import React, { FC } from "react";
import { SVGBase } from "../../types/svg-base";
import { SVGPath } from "../../types/svg-path";

interface Props {
  map?: SVGBase;
  mapStyle?: any;
  pathSelectedStyle?: any;
  isPathSelected?: (path: SVGPath) => boolean;
  onPathMouseOver?: (event: React.MouseEvent<SVGElement>) => void;
  onPathMouseMove?: (event: React.MouseEvent<SVGElement>) => void;
  onPathMouseOut?: () => void;
}

const SVGMap: FC<Props> = ({
  map = null,
  mapStyle = {},
  pathSelectedStyle = {},
  isPathSelected = (path: SVGPath): boolean => false,
  onPathMouseOver = (event: React.MouseEvent<SVGElement>): void => {},
  onPathMouseMove = (event: React.MouseEvent<SVGElement>): void => {},
  onPathMouseOut = (): void => {},
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={map.viewBox}
    aria-label={map.label}
    style={mapStyle}
  >
    {map.paths.map((path) => (
      <path
        key={path.id}
        id={path.id}
        name={path.name}
        d={path.d}
        aria-label={path.name}
        onMouseOver={onPathMouseOver}
        onMouseMove={onPathMouseMove}
        onMouseOut={onPathMouseOut}
        style={isPathSelected(path) ? pathSelectedStyle : {}}
      />
    ))}
  </svg>
);

export default SVGMap;
