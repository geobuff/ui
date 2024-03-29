import React, { FC, useContext } from "react";

import {
  Button,
  Flex,
  Select,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

import { LanguageContext } from "../../contexts/LanguageContext";

interface Props {
  imageCount?: number;
}

const MerchSummaryPlaceholder: FC<Props> = ({ imageCount = 2 }) => {
  const { t } = useContext(LanguageContext);

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      width="100%"
      justifyContent="center"
      padding={12}
    >
      <Flex justifyContent="center">
        <Flex direction="column">
          <Skeleton
            width={{ base: "300px", md: "500px" }}
            height={{ base: "300px", md: "500px" }}
            borderRadius="12px"
          />
          <SimpleGrid mt={6} columns={{ base: 3, md: 4 }} spacing={2}>
            {[...Array(imageCount)].map((_, i) => (
              <Skeleton
                key={i}
                width="100px"
                height="100px"
                borderRadius="12px"
              />
            ))}
          </SimpleGrid>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        width={{ base: "100%", lg: "40%" }}
        px={{ base: 0, lg: 12 }}
        mt={{ base: 12, lg: 0 }}
      >
        <Skeleton height="25px" width="150px" />
        <Skeleton height="25px" width="75px" mt={3} />
        <SkeletonText noOfLines={12} spacing={3} mt={3} />
        <Skeleton marginY={6}>
          <Select />
        </Skeleton>
        <Skeleton my={3}>
          <Button>{t.merchSummary.sizeGuide}</Button>
        </Skeleton>
        <Skeleton mt={3}>
          <Button>{t.global.addToCart}</Button>
        </Skeleton>
      </Flex>
    </Flex>
  );
};

export default MerchSummaryPlaceholder;
