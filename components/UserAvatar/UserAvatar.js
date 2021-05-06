import React, { useState } from "react";
import PropTypes from "prop-types";

import { Box, Image, Skeleton } from "@chakra-ui/react";

const UserAvatar = ({ borderRadius, height, width, imageUrl, alt }) => {
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

UserAvatar.propTypes = {
  alt: PropTypes.string,
  borderRadius: PropTypes.number,
  imageUrl: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};
UserAvatar.defaultProps = {
  alt: "",
  borderRadius: 50,
  imageUrl: null,
  height: PropTypes.string,
  width: PropTypes.string,
};

export default UserAvatar;
