import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Tooltip, useBreakpointValue } from "@chakra-ui/react";
import { SVGMap } from "react-svg-map";

import MapInteractionCSS from "../MapInteractionCSS";

const GameMap = ({ showTooltip, map, onLocationClassName }) => {
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipTop, setTooltipTop] = useState(0);
  const [tooltipLeft, setTooltipLeft] = useState(0);

  const shouldRenderTooltip = useBreakpointValue({ base: false, md: true });

  const mouseOver = (event) => {
    if (!showTooltip) return;
    setTooltipText(event.target.getAttribute("name"));
  };

  const mouseMove = (event) => {
    if (!showTooltip || !tooltipText) return;
    setTooltipOpen(true);
    setTooltipTop(event.clientY + 10);
    setTooltipLeft(event.clientX - 100);
  };

  const mouseOut = () => {
    if (!showTooltip) return;
    setTooltipText(null);
    setTooltipOpen(false);
  };

  return (
    <Box width="100%">
      <Box textAlign="center" height="100%">
        {shouldRenderTooltip ? (
          <Tooltip
            label={tooltipText}
            position="absolute"
            top={tooltipTop}
            left={tooltipLeft}
            isOpen={tooltipOpen}
          >
            <MapInteractionCSS>
              <SVGMap
                map={map}
                className="quiz-map"
                locationClassName={onLocationClassName}
                onLocationMouseOver={mouseOver}
                onLocationMouseMove={mouseMove}
                onLocationMouseOut={mouseOut}
              />
            </MapInteractionCSS>
          </Tooltip>
        ) : (
          <MapInteractionCSS>
            <SVGMap
              map={map}
              className="quiz-map"
              locationClassName={onLocationClassName}
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

GameMap.propTypes = {
  showTooltip: PropTypes.bool,
  map: PropTypes.any,
  onLocationClassName: PropTypes.func,
};
GameMap.defaultProps = {
  showTooltip: false,
  map: null,
  onLocationClassName: () => {},
};

export default GameMap;
