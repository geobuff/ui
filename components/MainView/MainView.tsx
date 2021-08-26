import React, { FC } from "react";
import { Flex } from "@chakra-ui/react";

import { FooterVariant } from "../../types/footer-variant";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";

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
}) => (
  <>
    <Flex
      as="main"
      direction="column"
      width="100%"
      marginX="auto"
      flex={1}
      {...props}
    >
      {hasNavigationBar && <NavigationBar />}
      {children}
    </Flex>
    {hasFooter && <Footer variant={footerVariant} />}
  </>
);

export default MainView;
