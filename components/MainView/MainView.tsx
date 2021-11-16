import React, { FC, useContext } from "react";
import { Box, BoxProps, Flex } from "@chakra-ui/react";

import { FooterVariant } from "../../types/footer-variant";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import { use100vh } from "react-div-100vh";
import { useSwipeable } from "react-swipeable";
import { AppContext } from "../../context/AppContext";

const isAppMobile = process.env.NEXT_PUBLIC_APP_MODE === "mobile";

interface Props extends BoxProps {
  footerVariant?: FooterVariant;
  hasNavigationBar?: boolean;
  hasFooter?: boolean;
}

const MainView: FC<Props> = ({
  children = null,
  footerVariant = FooterVariant.EXTENDED,
  hasNavigationBar = true,
  hasFooter = true,
  ...props
}) => {
  const height = use100vh();
  const { setIsNavSidebarOpen } = useContext(AppContext);

  const handlers = useSwipeable({
    onSwipedRight: () => isAppMobile && setIsNavSidebarOpen(true),
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
        {...props}
      >
        <Box
          position="fixed"
          width={6}
          top={0}
          left={0}
          bottom={0}
          zIndex={2}
          {...handlers}
        />
        {hasNavigationBar && <NavigationBar />}
        <Flex flex={1} direction="column" marginTop={14}>
          {children}
        </Flex>
        {hasFooter && height && <Footer variant={footerVariant} />}
      </Flex>
    </>
  );
};

export default MainView;
