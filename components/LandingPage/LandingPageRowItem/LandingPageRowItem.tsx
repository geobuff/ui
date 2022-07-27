import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import Image from "next/image";

export interface Props {
  imageUrl?: string;
  imageAlt?: string;
  explainer?: string;
  index?: number;
}

const LandingPageRowItem: FC<Props> = ({
  imageUrl = "",
  imageAlt = "",
  explainer = "",
  index = 0,
}) => {
  const image = (
    <Flex justifyContent="center">
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={630}
        height={630}
        priority={index === 0}
      />
    </Flex>
  );

  const content = (
    <Flex
      direction="column"
      justifyContent="center"
      padding={{ base: 3, md: 12 }}
    >
      <Text fontSize="24px">{explainer}</Text>
    </Flex>
  );

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} mb={12}>
      {index % 2 === 0 ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
    </SimpleGrid>
  );
};

export default LandingPageRowItem;
