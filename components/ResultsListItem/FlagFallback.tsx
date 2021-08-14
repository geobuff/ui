import React from "react";
import PropTypes from "prop-types";

import { Box } from "@chakra-ui/react";

const FlagFallback = ({ height, width }) => (
  <Box
    height={height}
    width={width}
    borderRadius={4}
    backgroundColor="#364858"
  />
);

FlagFallback.propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ]),
};

FlagFallback.defaultProps = {
  height: "18px",
  width: "24.5px",
};

export default FlagFallback;
