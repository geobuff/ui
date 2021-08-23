import React, { FC } from "react";

import { Box } from "@chakra-ui/react";

interface Props {
  height?: string | number | Array<string> | object;
  width?: string | number | Array<string> | object;
}

const FlagFallback: FC<Props> = ({ height="18px", width="24.5px" }) => (
  <Box
    height={height}
    width={width}
    borderRadius={4}
    backgroundColor="#364858"
  />
);

export default FlagFallback;
