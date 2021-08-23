import React, { useState, FC } from "react";

import { Box, Image, Skeleton } from "@chakra-ui/react";

interface Props {
  borderRadius?: number;
  height?: string;
  width?: string;
  imageUrl?: string;
  alt?: string;
}

const UserAvatar: FC<Props> = ({ borderRadius=50, height="", width="", imageUrl="", alt="" }) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <Box
      height={height}
      width={width}
      backgroundColor="transparent"
      borderRadius={borderRadius}
    >
      <Image
        display={hasLoaded ? "flex" : "none"}
        src={imageUrl}
        alt={alt}
        height={height}
        width={width}
        borderRadius={borderRadius}
        objectFit="cover"
        border="border.primary"
        onLoad={() => setHasLoaded(true)}
      />
      <Skeleton
        borderRadius={borderRadius}
        display={hasLoaded ? "none" : "flex"}
        height={height}
        width={width}
      />
    </Box>
  );
};

export default UserAvatar;
