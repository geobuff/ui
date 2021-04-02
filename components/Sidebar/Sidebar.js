import React from "react";
import PropTypes from "prop-types";

import { Box, Divider, Heading } from "@chakra-ui/react";

const Sidebar = ({ heading, children }) => (
  <Box
    position="absolute"
    top={0}
    bottom={0}
    left={0}
    width="375px"
    backgroundColor="#FFF"
    boxShadow="6px 4px 4px rgba(0,0,0,0.08)"
    overflowY="scroll"
    minHeight="100%"
  >
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      padding={4}
      paddingBottom="100px"
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
