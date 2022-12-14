import React, { FC, useContext } from "react";

import { FooterVariant, MainView } from "@geobuff/buff-ui/components";

import { BoxProps } from "@chakra-ui/react";

import { AppContext } from "../context/AppContext";

import { FooterContainer } from "./FooterContainer";
import { NavigationBarContainer } from "./NavigationBarContainer";

interface Props extends BoxProps {
  children?: React.ReactNode;
  isSimplePage?: boolean;
  hasFooter?: boolean;
}

export const MainViewContainer: FC<Props> = ({
  children = null,
  isSimplePage = false,
  hasFooter = true,
  ...props
}) => {
  const { error, setIsNavSidebarOpen } = useContext(AppContext);

  const navigationContent = <NavigationBarContainer />;

  const footerContent = (
    <FooterContainer
      variant={isSimplePage ? FooterVariant.SIMPLE : FooterVariant.EXTENDED}
    />
  );

  return (
    <MainView
      isAppMobile={process.env.NEXT_PUBLIC_APP_MODE === "mobile"}
      isSimplePage={isSimplePage}
      hasFooter={hasFooter}
      error={error}
      navigationContent={navigationContent}
      footerContent={footerContent}
      onIsSidebarOpenChange={setIsNavSidebarOpen}
      {...props}
    >
      {children}
    </MainView>
  );
};
