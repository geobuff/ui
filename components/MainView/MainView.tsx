import React, { FC } from "react";
import { Flex } from "@chakra-ui/react";

import { FooterVariant } from "../../types/footer-variant";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import { use100vh } from "react-div-100vh";

interface Props {
  footerVariant?: FooterVariant;
  hasNavigationBar?: boolean;
  hasFooter?: boolean;
  [x: string]: any;
}

const MainView: FC<Props> = ({
  children = null,
  footerVariant = FooterVariant.EXTENDED,
  hasNavigationBar = true,
  hasFooter = true,
  ...props
}) => {
  const height = use100vh();
  return (
    <>
      <Flex
        as="main"
        direction="column"
        minHeight={height}
        width="100%"
        marginX="auto"
        flex={1}
        {...props}
      >
        {hasNavigationBar && <NavigationBar />}
        <Flex flex={1} direction="column" marginTop={14}>
          {children}
        </Flex>
      </Flex>
      {hasFooter && height && <Footer variant={footerVariant} />}
    </>
  );
};

export default MainView;
