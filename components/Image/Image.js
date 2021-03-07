import React, { useState } from "react";
import PropTypes from "prop-types";
import { Image as ChakraImage, Skeleton } from "@chakra-ui/react";

const Image = ({ src, height, width, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => setIsLoading(false);

  return (
    <>
      {isLoading && <Skeleton height={height} width={width} {...props} />}
      <ChakraImage
        display={isLoading && "none"}
        src={src}
        height={height}
        width={width}
        onLoad={handleLoad}
        {...props}
      />
    </>
  );
};

Image.propTypes = {
  src: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};
Image.defaultProps = {
  src: "",
  height: "100px",
  width: "100px",
};

export default Image;
