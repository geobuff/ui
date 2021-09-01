import React, { useEffect, useState, FC } from "react";
import { Image as ChakraImage, Skeleton } from "@chakra-ui/react";

export interface Props {
  src?: string;
  height?: string;
  width?: string;
  [x: string]: any;
}

const Image: FC<Props> = ({
  src = "",
  height = "100px",
  width = "100px",
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  const handleLoad = (): void => setIsLoading(false);

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

export default Image;
