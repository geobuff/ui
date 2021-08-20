import React, { FC } from "react";
import { Box, Collapse, Text } from "@chakra-ui/react";

interface Props {
  errorMessage?: string;
}

const GameInputBannerError: FC<Props> = ({ errorMessage="" }) => {
  return (
    <Collapse
      in={!!errorMessage}
      animateOpacity
      unmountOnExit
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <Box p={1} backgroundColor="red.500" color="white">
        <Text fontWeight={600} fontSize={11} textAlign="center">
          {errorMessage}
        </Text>
      </Box>
    </Collapse>
  );
};

export default GameInputBannerError;
