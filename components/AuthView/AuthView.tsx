import React, { FC } from "react";
import { Flex } from "@chakra-ui/react";

interface Props {
  height?: string | number | string[] | object;
  marginTop?: string | number | string[] | object;
}

const AuthView: FC<Props> = ({ children, ...props }) => (
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
