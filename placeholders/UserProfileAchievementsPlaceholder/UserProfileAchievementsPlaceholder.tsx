import React, { FC } from "react";

import { Card } from "@geobuff/buff-ui/components";

import { Flex, Heading, SimpleGrid, Skeleton } from "@chakra-ui/react";

interface Props {
  noOfTiles?: number;
}

const UserProfileAchievementsPlaceholder: FC<Props> = ({ noOfTiles = 9 }) => (
  <Card paddingX={{ base: 4, md: 6 }} paddingY={2}>
    <Skeleton>
      <Heading size="md" mt={6} mb={12}>
        Achievements
      </Heading>
    </Skeleton>
    <Flex direction="column" justifyContent="center" marginX={2}>
      <SimpleGrid
        mb={6}
        justifyContent="center"
        minChildWidth="75px"
        spacingY={8}
        spacingX={5}
      >
        {[...Array(noOfTiles)].map((_, i) => (
          <Skeleton key={i} borderRadius={50} height="75px" width="75px" />
        ))}
      </SimpleGrid>
    </Flex>
  </Card>
);

export default UserProfileAchievementsPlaceholder;
