import React from "react";
import PropTypes from "prop-types";

import { Box, Flex } from "@chakra-ui/react";

const MainView = ({ children, ...props }) => (
  <Flex width="100%" mx="auto" position="relative" {...props}>
    <Box position="absolute" left={0} right={0} top={0} bottom={0}>
      {children}
    </Box>
  </Flex>
);

MainView.propTypes = {
  children: PropTypes.array,
};
MainView.defaultProps = {
  children: [],
};

export default MainView;
