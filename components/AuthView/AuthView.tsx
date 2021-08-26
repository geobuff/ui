import React, { FC } from "react";
import { Flex } from "@chakra-ui/react";

interface Props {
  height?: string | number | string[] | object;
  marginTop?: string | number | string[] | object;
}

const AuthView: FC<Props> = ({
  height = "80vh",
  marginTop = 6,
  children,
  ...props
}) => (
  <Flex
    marginTop={marginTop}
    height={height}
    direction="column"
    justifyContent="center"
    {...props}
  >
    {children}
  </Flex>
);

export default AuthView;
