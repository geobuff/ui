import React, { FC } from "react";
import Image from "next/image";
import { Flex, Link, Text } from "@chakra-ui/react";

export interface Props {
  src: string;
  width: number;
  height: number;
  alt?: string;
  priority?: boolean;
  attributeName?: string;
  attributeUrl?: string;
}

const BlogImage: FC<Props> = ({
  src,
  width,
  height,
  alt = "",
  priority = false,
  attributeName = "",
  attributeUrl = "",
}) => {
  return (
    <Flex direction="column" my={12}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      {attributeName && (
        <Text fontSize="10px" mt={1}>
          {`Photo by `}
          <Link href={attributeUrl}>{attributeName}</Link>
          {` on `}
          <Link
            href={`https://unsplash.com?utm_source=GeoBuff&utm_medium=referral`}
          >
            Unsplash
          </Link>
        </Text>
      )}
    </Flex>
  );
};

export default BlogImage;
