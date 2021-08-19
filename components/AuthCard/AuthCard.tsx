import React, { FC } from "react";
import { Flex } from "@chakra-ui/react";

interface Props {
  height?: string | number | Array<string> | object;
  width?: string | number | Array<string> | object;
  [x:string]: any;
};

const AuthCard: FC<Props> = ({ height=560, width=375, children=null, ...props }) => (
  <Flex
    backgroundColor="white"
    borderRadius={12}
    boxShadow="0px 4px 4px rgba(179, 187, 209, 0.25)"
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
