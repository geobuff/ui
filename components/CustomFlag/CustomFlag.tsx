import React, { FC, useState } from "react";
import { Box, BoxProps, Skeleton, Image } from "@chakra-ui/react";

interface Props extends BoxProps {
  url?: string;
  height?: string;
  width?: string;
}

const CustomFlag: FC<Props> = ({
  url = "",
  height = "18px",
  width = "24.5px",
  ...props
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <Box
      borderRadius={4}
      minHeight={height}
      minWidth={width}
      backgroundColor="transparent"
      {...props}
    >
      <Image
        display={hasLoaded ? "flex" : "none"}
        src={url}
        borderRadius={4}
        height={height}
        width={width}
        objectFit="cover"
        onLoad={(): void => setHasLoaded(true)}
      />
      <Skeleton
        display={hasLoaded ? "none" : "flex"}
        borderRadius={4}
        height={height}
        width={width}
      />
    </Box>
  );
};

export default CustomFlag;
