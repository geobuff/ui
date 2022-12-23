import React, { FC, useMemo, useState } from "react";

import { SVGBase, SVGMap, SVGMapContainer } from "@geobuff/buff-ui/components";

import { Box, Tooltip, useBreakpointValue } from "@chakra-ui/react";

import { getInitialMapFill } from "../../helpers/map";

interface Props {
  showTooltip?: boolean;
  map?: SVGBase;
  mapClassName?: string;
}

const GameMap: FC<Props> = ({
  showTooltip = false,
  map = null,
  mapClassName = "",
}) => {
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipTop, setTooltipTop] = useState(0);
  const [tooltipLeft, setTooltipLeft] = useState(0);

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const mapStyle = {
    height: isMobile ? "initial" : "90vh",
    minWidth: isMobile ? "initial" : "100%",
    fill: getInitialMapFill(mapClassName),
    margin: "12px",
  };

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

  const mapPaths = useMemo(() => {
    return map;
  }, [map]);

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
            <SVGMapContainer isMobile={isMobile}>
              <SVGMap
                map={mapPaths}
                mapStyle={mapStyle}
                onPathMouseOver={mouseOver}
                onPathMouseMove={mouseMove}
                onPathMouseOut={mouseOut}
              />
            </SVGMapContainer>
          </Tooltip>
        ) : (
          <SVGMapContainer isMobile={isMobile}>
            <SVGMap
              map={mapPaths}
              mapStyle={mapStyle}
              onPathMouseOver={mouseOver}
              onPathMouseMove={mouseMove}
              onPathMouseOut={mouseOut}
            />
          </SVGMapContainer>
        )}
      </Box>
    </Box>
  );
};

export default GameMap;
