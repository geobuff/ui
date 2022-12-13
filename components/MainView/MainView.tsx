import React, { FC, useContext } from "react";

import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { use100vh } from "react-div-100vh";
import { useSwipeable } from "react-swipeable";

import { AppContext } from "../../context/AppContext";

import { FooterContainer, NavigationBarContainer } from "../../containers";
import { FooterVariant } from "../../types/footer-variant";

interface Props extends BoxProps {
  children?: React.ReactNode;
  isSimplePage?: boolean;
  hasFooter?: boolean;
}

const MainView: FC<Props> = ({
  children = null,
  isSimplePage = false,
  hasFooter = true,
  ...props
}) => {
  const height = use100vh();
  const { setIsNavSidebarOpen } = useContext(AppContext);

  const handlers = useSwipeable({
    onSwipedRight: () =>
      process.env.NEXT_PUBLIC_APP_MODE === "mobile" &&
      setIsNavSidebarOpen(true),
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
        backgroundColor={
          isSimplePage ? { base: "#FFF", md: "#F0F0F0" } : "#F0F0F0"
        }
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
        {!isSimplePage && <NavigationBarContainer />}
        <Flex flex={1} direction="column" marginTop={!isSimplePage ? 14 : 0}>
          {children}
        </Flex>
        {hasFooter && height && (
          <FooterContainer
            variant={
              isSimplePage ? FooterVariant.SIMPLE : FooterVariant.EXTENDED
            }
          />
        )}
      </Flex>
    </>
  );
};

export default MainView;
