import React, { FC } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

interface Props extends FlexProps {
  height?: string | number | string[] | object;
  width?: string | number | string[] | object;
}

const AuthCard: FC<Props> = ({
  height = 560,
  width = 375,
  children = null,
  ...props
}) => (
  <Flex
    backgroundColor={{ base: "white", md: "none" }}
    borderRadius={12}
    boxShadow={{ base: "none", md: "0px 4px 4px rgba(179, 187, 209, 0.25)" }}
    direction="column"
    padding={5}
    height={height}
    width={width}
    {...props}
  >
    {children}
  </Flex>
);

export default AuthCard;
