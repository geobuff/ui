import React from "react";
import PropTypes from "prop-types";

import { Box } from "@chakra-ui/react";

import NavigationBar from "../NavigationBar";
import Footer from "../Footer";

const MainView = ({
  footerVariant,
  hasNavigationBar,
  hasFooter,
  children,
  ...props
}) => (
  <>
    <Box
      as="main"
      width="100%"
      marginX="auto"
      marginBottom={10}
      flexGrow={1}
      {...props}
    >
      {hasNavigationBar && <NavigationBar />}
      {children}
    </Box>
    {hasFooter && <Footer variant={footerVariant} />}
  </>
);

MainView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
  footerVariant: PropTypes.oneOf(["simple", "extended"]),
  hasNavigationBar: PropTypes.bool,
  hasFooter: PropTypes.bool,
};
MainView.defaultProps = {
  children: null,
  footerVariant: "extended",
  hasNavigationBar: true,
  hasFooter: true,
};

export default MainView;
