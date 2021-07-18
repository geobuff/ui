import React from "react";
import PropTypes from "prop-types";

import { Flex } from "@chakra-ui/react";

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
    <Flex
      as="main"
      direction="column"
      width="100%"
      marginX="auto"
      flexGrow={1}
      {...props}
    >
      {hasNavigationBar && <NavigationBar />}
      {children}
    </Flex>
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
