import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Skeleton, Image } from "@chakra-ui/react";

const CustomFlag = ({ url }) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <Box
      borderRadius={4}
      height="18px"
      width="24.5px"
      backgroundColor="transparent"
    >
      <Image
        display={hasLoaded ? "flex" : "none"}
        src={url}
        alt={"Custom flag."}
        borderRadius={4}
        height="18px"
        width="24.5px"
        onLoad={() => setHasLoaded(true)}
      />
      <Skeleton
        display={hasLoaded ? "none" : "flex"}
        borderRadius={4}
        height="18px"
        width="24.5px"
      />
    </Box>
  );
};

CustomFlag.propTypes = {
  url: PropTypes.string,
};

export default CustomFlag;
