import React, { useState } from "react";
import PropTypes from "prop-types";
import { MapInteraction } from "react-map-interaction";

import { Box, Button, useBreakpointValue } from "@chakra-ui/react";

import SolidRefresh from "../../Icons/SolidRefresh";

import OutlinedZoomIn from "../../Icons/OutlinedZoomIn";
import OutlinedZoomOut from "../../Icons/OutlinedZoomOut";

const defaultValue = { scale: 1, translation: { x: 0, y: 0 } };

const MapInteractionCSS = (props) => {
  const [value, setValue] = useState(defaultValue);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleReset = () => setValue(defaultValue);
  const handleChange = (value) => setValue(value);

  // Prevents flickering
  if (isMobile === undefined) {
    return null;
  }

  return (
    <Box
      position="absolute"
      top={{ base: 130, lg: "50px" }}
      left={{ base: 0, lg: "375px" }}
      bottom={0}
      right={0}
    >
      <Box
        zIndex={999}
        position="fixed"
        top={isMobile ? "142px" : "200px"}
        right="18px"
      >
        <Button
          paddingTop="4px"
          paddingLeft="18px"
          height="46px"
          width="44px"
          onClick={handleReset}
          borderRadius={8}
        >
          <SolidRefresh />
        </Button>
      </Box>

      <MapInteraction
        showControls
        maxScale={15}
        value={value}
        onChange={handleChange}
        btnClass="quiz-map-controls"
        plusBtnContents={
          !isMobile && (
            <Button
              marginTop="16px"
              paddingTop="3px"
              paddingLeft="18px"
              height="46px"
              width="44px"
              borderTopLeftRadius={8}
              borderTopRightRadius={8}
              borderBottomLeftRadius={0}
              borderBottomRightRadius={0}
              borderBottom="1px solid #E3E1E1"
            >
              <OutlinedZoomIn />
            </Button>
          )
        }
        minusBtnContents={
          !isMobile && (
            <Button
              paddingTop="3px"
              paddingLeft="18px"
              height="46px"
              width="44px"
              borderTopLeftRadius={0}
              borderTopRightRadius={0}
              borderBottomLeftRadius={8}
              borderBottomRightRadius={8}
              borderTop="1px solid #E3E1E1"
            >
              <OutlinedZoomOut />
            </Button>
          )
        }
        {...props}
      >
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
};

MapInteractionCSS.propTypes = {
  children: PropTypes.object,
};

MapInteractionCSS.defaultProps = {
  children: null,
};

export default MapInteractionCSS;
