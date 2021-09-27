import React, { FC } from "react";

import { Map } from "../../types/map";
import { SVGLocation } from "../../types/svg-location";
import SVGMap from "../SVGMap";

interface Props {
  isMobile?: boolean;
  map?: Map;
  getLocationClassName?: (location: SVGLocation) => string;
  onLocationMouseOver?: (event: React.MouseEvent<SVGElement>) => void;
  onLocationMouseMove?: (event: React.MouseEvent<SVGElement>) => void;
  onLocationMouseOut?: () => void;
}

const SVGMapWrapper: FC<Props> = ({
  isMobile = false,
  map = null,
  getLocationClassName = (location: SVGLocation): string => "",
  onLocationMouseOver = (event: React.MouseEvent<SVGElement>): void => {},
  onLocationMouseMove = (event: React.MouseEvent<SVGElement>): void => {},
  onLocationMouseOut = (): void => {},
}) => (
  <SVGMap
    map={map}
    getLocationClassName={getLocationClassName}
    onLocationMouseOver={onLocationMouseOver}
    onLocationMouseMove={onLocationMouseMove}
    onLocationMouseOut={onLocationMouseOut}
    style={{
      height: isMobile ? "initial" : "90vh",
      minWidth: isMobile ? "initial" : "100%",
      fill: "#6dca94",
      margin: "12px",
    }}
    _before={{
      content: "",
      width: "1px",
      marginLeft: "-1px",
      float: "left",
      height: 0,
      paddingTop: "(9 / 16) * 100%",
    }}
    _after={{
      content: "",
      display: "table",
      clear: "both",
    }}
  />
);

export default SVGMapWrapper;
