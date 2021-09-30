import React, { FC } from "react";
import { SVGBase } from "../../types/svg-base";

interface Props {
  map?: SVGBase;
  mapStyle?: any;
  onPathMouseOver?: (event: React.MouseEvent<SVGElement>) => void;
  onPathMouseMove?: (event: React.MouseEvent<SVGElement>) => void;
  onPathMouseOut?: () => void;
}

const SVGMap: FC<Props> = ({
  map = null,
  mapStyle = {},
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
        style={path.style ? path.style : {}}
      />
    ))}
  </svg>
);

export default SVGMap;
