import React, { useEffect, useState, FC } from "react";
import {
  Image as ChakraImage,
  Skeleton,
  ImageProps,
  SkeletonProps,
} from "@chakra-ui/react";

export interface Props extends ImageProps {
  src?: string;
  hasSkeleton?: boolean;
}

const Image: FC<Props> = ({
  src = "",
  height = "100px",
  width = "100px",
  hasSkeleton = true,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  const handleLoad = (): void => setIsLoading(false);

  return (
    <>
      {isLoading && hasSkeleton && (
        <Skeleton height={height} width={width} {...(props as SkeletonProps)} />
      )}
      <ChakraImage
        display={isLoading && "none"}
        src={src}
        height={isLoading && !hasSkeleton ? 0 : height}
        width={width}
        onLoad={handleLoad}
        {...props}
      />
    </>
  );
};

export default Image;
