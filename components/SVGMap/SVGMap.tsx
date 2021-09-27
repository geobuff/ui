import React, { FC } from "react";
import { SVGLocation } from "../../types/svg-location";
import { Map } from "../../types/map";

interface Props {
  map?: Map;
  getLocationClassName?: (location: SVGLocation) => string;
  onLocationMouseOver?: (event: React.MouseEvent<SVGElement>) => void;
  onLocationMouseMove?: (event: React.MouseEvent<SVGElement>) => void;
  onLocationMouseOut?: () => void;
  [x: string]: any;
}

const SVGMap: FC<Props> = ({
  map = null,
  getLocationClassName = (location: SVGLocation): string => "",
  onLocationMouseOver = (event: React.MouseEvent<SVGElement>): void => {},
  onLocationMouseMove = (event: React.MouseEvent<SVGElement>): void => {},
  onLocationMouseOut = (): void => {},
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={map.viewBox}
    aria-label={map.label}
    {...props}
  >
    {map.locations.map((location) => (
      <path
        key={location.id}
        id={location.id}
        name={location.name}
        d={location.path}
        aria-label={location.name}
        className={getLocationClassName(location)}
        onMouseOver={onLocationMouseOver}
        onMouseOut={onLocationMouseOut}
        onMouseMove={onLocationMouseMove}
      />
    ))}
  </svg>
);

export default SVGMap;
