import React, { useState, FC } from "react";
import { Box, Tooltip, useBreakpointValue } from "@chakra-ui/react";

import MapInteractionCSS from "../MapInteractionCSS";
import { SVGLocation } from "../../types/svg-location";
import { Map } from "../../types/map";
import SVGMapWrapper from "../SVGMapWrapper";

interface Props {
  showTooltip?: boolean;
  map?: Map;
  onLocationClassName?: (location: SVGLocation) => string;
}

const GameMap: FC<Props> = ({
  showTooltip = false,
  map = null,
  onLocationClassName = (location: SVGLocation): string => "",
}) => {
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipTop, setTooltipTop] = useState(0);
  const [tooltipLeft, setTooltipLeft] = useState(0);

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const mouseOver = (event: React.MouseEvent<SVGElement>): void => {
    if (!showTooltip) return;
    setTooltipText(event.currentTarget.getAttribute("name"));
  };

  const mouseMove = (event: React.MouseEvent<SVGElement>): void => {
    if (!showTooltip || !tooltipText) return;
    setTooltipOpen(true);
    setTooltipTop(event.clientY + 10);
    setTooltipLeft(event.clientX - 100);
  };

  const mouseOut = (): void => {
    if (!showTooltip) return;
    setTooltipText(null);
    setTooltipOpen(false);
  };

  return (
    <Box width="100%">
      <Box textAlign="center" height="100%">
        {!isMobile ? (
          <Tooltip
            label={tooltipText}
            position="absolute"
            top={tooltipTop}
            left={tooltipLeft}
            isOpen={tooltipOpen}
          >
            <MapInteractionCSS>
              <SVGMapWrapper
                map={map}
                getLocationClassName={onLocationClassName}
                onLocationMouseOver={mouseOver}
                onLocationMouseMove={mouseMove}
                onLocationMouseOut={mouseOut}
              />
            </MapInteractionCSS>
          </Tooltip>
        ) : (
          <MapInteractionCSS>
            <SVGMapWrapper
              isMobile
              map={map}
              getLocationClassName={onLocationClassName}
              onLocationMouseOver={mouseOver}
              onLocationMouseMove={mouseMove}
              onLocationMouseOut={mouseOut}
            />
          </MapInteractionCSS>
        )}
      </Box>
    </Box>
  );
};

export default GameMap;
