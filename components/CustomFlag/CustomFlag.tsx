import React, { FC } from "react";

import { Box, BoxProps } from "@chakra-ui/react";
import Image from "next/image";

interface Props extends BoxProps {
  url?: string;
  code?: string;
  height?: number;
  width?: number;
}

const CustomFlag: FC<Props> = ({
  url = "",
  code = "",
  height = 18,
  width = 24.5,
  ...props
}) => (
  <Box {...props}>
    <Image
      src={url}
      alt={`Flag for ${code}`}
      width={width}
      height={height}
      objectFit="cover"
      priority
    />
  </Box>
);

export default CustomFlag;
