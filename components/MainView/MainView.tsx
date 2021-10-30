import React, { FC, useContext, useState } from "react";
import { Flex } from "@chakra-ui/react";

import { FooterVariant } from "../../types/footer-variant";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import { use100vh } from "react-div-100vh";
import { useSwipeable } from "react-swipeable";
import { AppContext } from "../../context/AppContext";
import { CurrentUserContext } from "../../context/CurrentUserContext";

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

  const { isNavSidebarOpen, setIsNavSidebarOpen, isAppMobile } = useContext(
    AppContext
  );

  const { userAgent } = useContext(CurrentUserContext);

  console.log(userAgent, "userAgent");

  const handlers = useSwipeable({
    onSwipedRight: () => isAppMobile && setIsNavSidebarOpen(!isNavSidebarOpen),
    trackTouch: true,
    trackMouse: false,
    rotationAngle: 0,
  });

  return (
    <>
      <Flex
        as="main"
        direction="column"
        minHeight={height}
        width="100%"
        marginX="auto"
        flex={1}
        {...handlers}
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
