import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Skeleton, Image } from "@chakra-ui/react";

const CustomFlag = ({ url, height, width, ...props }) => {
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
        alt={"Custom flag."}
        borderRadius={4}
        height={height}
        width={width}
        objectFit="cover"
        onLoad={() => setHasLoaded(true)}
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

CustomFlag.propTypes = {
  url: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};
CustomFlag.defaultProps = {
  url: "",
  height: "18px",
  width: "24.5px",
};

export default CustomFlag;
