import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/react";

const MapTooltip = ({ value, style }) => (
  <Box
    position="fixed"
    width="200px"
    padding={3}
    border="1px solid darkgray"
    backgroundColor="white"
    textAlign="center"
    borderRadius={6}
    style={style}
  >
    <Text fontWeight="bold">{value}</Text>
  </Box>
);

MapTooltip.propTypes = {
  value: PropTypes.string,
  style: PropTypes.object,
};

export default MapTooltip;
