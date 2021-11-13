import React, { useState, FC } from "react";
import { MapInteraction } from "react-map-interaction";

import { Box, Button, useBreakpointValue } from "@chakra-ui/react";

import SolidRefresh from "../../Icons/SolidRefresh";

import OutlinedZoomIn from "../../Icons/OutlinedZoomIn";
import OutlinedZoomOut from "../../Icons/OutlinedZoomOut";

const defaultValue = { scale: 1, translation: { x: 0, y: 0 } };

const GameMapInteraction: FC = ({ children = null, ...props }) => {
  const [value, setValue] = useState(defaultValue);

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const handleReset = (): void => setValue(defaultValue);
  const handleChange = (value): void => setValue(value);

  // Prevents flickering
  if (isMobile === undefined) {
    return null;
  }

  return (
    <Box
      position="absolute"
      top={{ base: 126, lg: "50px" }}
      left={{ base: 0, lg: "375px" }}
      bottom={0}
      right={0}
    >
      <Box
        zIndex={1}
        position="fixed"
        top={isMobile ? "144px" : "190px"}
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
            <OutlinedZoomIn
              height="46px"
              width="44px"
              marginTop="18px"
              padding="13px"
              borderTopLeftRadius={8}
              borderTopRightRadius={8}
              borderBottomLeftRadius={0}
              borderBottomRightRadius={0}
              borderBottom="1px solid #E3E1E1"
              background="#EDF2F7"
              _hover={{
                background: "#E2E8F0",
              }}
            />
          )
        }
        minusBtnContents={
          !isMobile && (
            <OutlinedZoomOut
              height="46px"
              width="44px"
              padding="13px"
              borderTopLeftRadius={0}
              borderTopRightRadius={0}
              borderBottomLeftRadius={8}
              borderBottomRightRadius={8}
              borderTop="1px solid #E3E1E1"
              background="#EDF2F7"
              _hover={{
                background: "#E2E8F0",
              }}
            />
          )
        }
        {...props}
      >
        {({ translation, scale }): React.ReactNode => {
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
                {children}
              </div>
            </div>
          );
        }}
      </MapInteraction>
    </Box>
  );
};

export default GameMapInteraction;
