import React, { FC } from "react";
import { SVGBase } from "../../types/svg-base";
import { SVGPath } from "../../types/svg-path";

interface Props {
  map?: SVGBase;
  className?: string;
  getPathClassName?: (path: SVGPath) => string;
  onPathMouseOver?: (event: React.MouseEvent<SVGElement>) => void;
  onPathMouseMove?: (event: React.MouseEvent<SVGElement>) => void;
  onPathMouseOut?: () => void;
  [x: string]: any;
}

const SVGMap: FC<Props> = ({
  map = null,
  className = "",
  getPathClassName = (path: SVGPath): string => "",
  onPathMouseOver = (event: React.MouseEvent<SVGElement>): void => {},
  onPathMouseMove = (event: React.MouseEvent<SVGElement>): void => {},
  onPathMouseOut = (): void => {},
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox={map.viewBox}
    aria-label={map.label}
    {...props}
  >
    {map.paths.map((path) => (
      <path
        key={path.id}
        id={path.id}
        name={path.name}
        d={path.d}
        aria-label={path.name}
        className={getPathClassName(path)}
        onMouseOver={onPathMouseOver}
        onMouseMove={onPathMouseMove}
        onMouseOut={onPathMouseOut}
      />
    ))}
  </svg>
);

export default SVGMap;
