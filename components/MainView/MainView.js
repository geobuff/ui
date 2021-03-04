import React from "react";
import PropTypes from "prop-types";

import { Box, Flex } from "@chakra-ui/react";

const MainView = ({ children, backgroundColor, ...props }) => (
  <Flex width="100%" mx="auto" position="relative" {...props}>
    <Box position="absolute" left={0} right={0} top={0} bottom={0}>
      <Box backgroundColor={backgroundColor}>{children}</Box>
    </Box>
  </Flex>
);

MainView.propTypes = {
  children: PropTypes.func,
  backgroundColor: PropTypes.string,
};
MainView.defaultProps = {
  children: () => {},
  backgroundColor: "#276f86",
};

export default MainView;
