import React from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

const CustomFlag = ({ url }) => (
  <Box
    height="18px"
    width="24.5px"
    borderRadius={4}
    bgImage={`url('${url}')`}
    bgPosition="center"
    bgRepeat="no-repeat"
    bgSize="cover"
  ></Box>
);

CustomFlag.propTypes = {
  url: PropTypes.string,
};

export default CustomFlag;
