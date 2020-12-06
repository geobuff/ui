import React from "react";
import PropTypes from "prop-types";

import { Box, Divider, Heading } from "@chakra-ui/core";

const Sidebar = ({ heading }) => (
  <Box
    p={4}
    width="400px"
    height="100vh"
    backgroundColor="#FFF"
    boxShadow="6px 4px 4px rgba(0,0,0,0.08)"
  >
    {!!heading && (
      <>
        <Heading mt={2} size="md" textAlign="center">
          {heading}
        </Heading>
        <Divider my={5} />
      </>
    )}
  </Box>
);

Sidebar.propTypes = {
  heading: PropTypes.string,
};

Sidebar.defaultProps = {
  heading: "",
};

export default Sidebar;
