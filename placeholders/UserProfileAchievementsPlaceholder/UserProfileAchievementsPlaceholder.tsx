import React, { FC } from "react";

import { Heading, Skeleton, SimpleGrid, Flex } from "@chakra-ui/react";

import Card from "../../components/Card";

interface Props {
  noOfTiles?: number;
}

const UserProfileAchievementsPlaceholder: FC<Props> = ({ noOfTiles = 8 }) => (
  <Card padding={6}>
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
