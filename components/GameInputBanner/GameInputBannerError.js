import React from "react";
import PropTypes from "prop-types";
import { Box, Collapse, Text } from "@chakra-ui/core";

const GameInputBannerError = ({ errorMessage }) => {
  return (
    <Collapse
      in={!!errorMessage}
      animateOpacity
      unmountOnExit
      style={{
        position: "absolute",
        left: 0,
        right: 0,
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

GameInputBannerError.propTypes = {
  errorMessage: PropTypes.string,
};
GameInputBannerError.defaultProps = {
  errorMessage: "",
};

export default GameInputBannerError;
