import React from "react";
import PropTypes from "prop-types";

import { Box, Divider, Heading } from "@chakra-ui/core";

const Sidebar = ({ heading, children }) => (
  <Box
    width="375px"
    maxHeight="100vh"
    p={4}
    backgroundColor="#FFF"
    boxShadow="6px 4px 4px rgba(0,0,0,0.08)"
    overflowY="scroll"
  >
    {!!heading && (
      <>
        <Heading mt={2} size="md" textAlign="center">
          {heading}
        </Heading>
        <Divider my={5} borderColor="#E3E1E1" borderWidth={1} />
      </>
    )}
    {children}
  </Box>
);

Sidebar.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node,
};

Sidebar.defaultProps = {
  heading: "",
  children: null,
};

export default Sidebar;
