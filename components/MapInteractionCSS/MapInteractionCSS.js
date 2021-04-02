import React from "react";
import PropTypes from "prop-types";
import { MapInteraction } from "react-map-interaction";

import { Box } from "@chakra-ui/react";

const MapInteractionCSS = (props) => (
  <Box position="absolute" top={0} left="375px" bottom={0} right={0}>
    <MapInteraction {...props}>
      {({ translation, scale }) => {
        const transform = `translate(${translation.x}px, ${translation.y}px) scale(${scale})`;

        return (
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "relative",
              overflow: "hidden",
              touchAction: "none",
              msTouchAction: "none",
              cursor: "all-scroll",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
            }}
          >
            <div
              style={{
                transform: transform,
                transformOrigin: "0 0",
                height: "100%",
              }}
            >
              {props.children}
            </div>
          </div>
        );
      }}
    </MapInteraction>
  </Box>
);

MapInteractionCSS.propTypes = {
  children: PropTypes.object,
};

export default MapInteractionCSS;
