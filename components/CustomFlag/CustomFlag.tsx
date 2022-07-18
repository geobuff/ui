import React, { FC } from "react";
import Image from "next/image";
import { Box, BoxProps } from "@chakra-ui/react";

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
      style={{
        borderRadius: 22,
      }}
      priority
    />
  </Box>
);

export default CustomFlag;
