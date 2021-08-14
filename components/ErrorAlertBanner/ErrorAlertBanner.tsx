import React from "react";
import PropTypes from "prop-types";
import { Box, Collapse, Text } from "@chakra-ui/react";

const ErrorAlertBanner = ({ error }) => (
  <Collapse
    in={error}
    animateOpacity
    unmountOnExit
    style={{
      position: "fixed",
      left: 0,
      right: 0,
      zIndex: 10,
    }}
  >
    <Box p={1} backgroundColor="red.500" color="white">
      <Text fontWeight={700} fontSize={{ base: 14, md: 18 }} textAlign="center">
        {error}
      </Text>
    </Box>
  </Collapse>
);

ErrorAlertBanner.propTypes = {
  error: PropTypes.string,
};
ErrorAlertBanner.defaultProps = {
  error: "",
};

export default ErrorAlertBanner;
