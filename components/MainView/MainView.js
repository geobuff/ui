import React from "react";
import PropTypes from "prop-types";

import { Box } from "@chakra-ui/react";

import NavigationBar from "../NavigationBar";
import Footer from "../Footer";

const MainView = ({ hasNavigationBar, hasFooter, children, ...props }) => (
  <>
    <Box as="main" width="100%" marginX="auto" marginBottom={10} {...props}>
      {hasNavigationBar && <NavigationBar />}
      {children}
    </Box>
    {hasFooter && <Footer />}
  </>
);

MainView.propTypes = {
  hasNavigationBar: PropTypes.bool,
  hasFooter: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
};
MainView.defaultProps = {
  hasNavigationBar: true,
  hasFooter: true,
  children: null,
};

export default MainView;
