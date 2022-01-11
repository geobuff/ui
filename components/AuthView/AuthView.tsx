import React, { FC } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

const AuthView: FC<FlexProps> = ({ children, ...props }) => (
  <Flex
    flex={1}
    direction="column"
    justifyContent="flex-start"
    paddingTop="2%"
    {...props}
  >
    {children}
  </Flex>
);

export default AuthView;
