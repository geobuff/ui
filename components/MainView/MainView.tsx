import React, { FC, MutableRefObject, useContext, useEffect } from "react";

import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { use100vh } from "react-div-100vh";
import { useSwipeable } from "react-swipeable";

import { AppContext } from "../../context/AppContext";

import { FooterVariant } from "../../types/footer-variant";
import Footer from "../Footer";
import NavigationBar from "../NavigationBar";

const isAppMobile = process.env.NEXT_PUBLIC_APP_MODE === "mobile";

interface Props extends BoxProps {
  children?: React.ReactNode;
  footerVariant?: FooterVariant;
  hasNavigationBar?: boolean;
  hasFooter?: boolean;
  innerRef?: MutableRefObject<any>;
}

const MainView: FC<Props> = ({
  children = null,
  footerVariant = FooterVariant.EXTENDED,
  hasNavigationBar = true,
  hasFooter = true,
  innerRef = null,
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

  useEffect(() => {
    if (innerRef) {
      innerRef.current.scrollIntoView();
    }
  }, [innerRef]);

  return (
    <>
      <Flex
        ref={innerRef}
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
        <Flex flex={1} direction="column" marginTop={hasNavigationBar ? 14 : 0}>
          {children}
        </Flex>
        {hasFooter && height && <Footer variant={footerVariant} />}
      </Flex>
    </>
  );
};

export default MainView;
