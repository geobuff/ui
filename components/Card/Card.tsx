import React, { FC } from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  [x: string]: any;
}

const Card: FC<Props> = ({ children = null, ...props }) => (
  <Box
    background="#FFF"
    boxShadow="0px 4px 4px rgba(180, 180, 180, 0.25)"
    borderRadius={12}
    width="100%"
    padding={4}
    {...props}
  >
    {children}
  </Box>
);

export default Card;
