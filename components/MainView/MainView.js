import React from "react";
import PropTypes from "prop-types";

import { Box } from "@chakra-ui/react";

import NavigationBar from "../NavigationBar";
import Footer from "../Footer";

const MainView = ({
  hasNavigationBar,
  hasFooter,
  footerVariant,
  children,
  ...props
}) => (
  <>
    <Box as="main" width="100%" marginX="auto" marginBottom={10} {...props}>
      {hasNavigationBar && <NavigationBar />}
      {children}
    </Box>
    {hasFooter && <Footer variant={footerVariant} />}
  </>
);

MainView.propTypes = {
  footerVariant: PropTypes.oneOf(["simple", "extended"]),
  hasNavigationBar: PropTypes.bool,
  hasFooter: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
};
MainView.defaultProps = {
  footerVariant: "extended",
  hasNavigationBar: true,
  hasFooter: true,
  children: null,
};

export default MainView;
