import React from "react";
import {
  Box,
  Heading,
  Skeleton,
  Text,
  Flex,
  Spacer,
  Progress,
  Center,
} from "@chakra-ui/react";

const UserProfileAchievementsPlaceholder = () => (
  <Box>
    <Skeleton>
      <Heading size="md" mt={6} mb={12}>
        Achievements
      </Heading>
    </Skeleton>
    <Box mt={6} mb={9}>
      <Flex mb={3}>
        <Skeleton>
          <Text>LEVEL</Text>
        </Skeleton>
        <Spacer />
        <Skeleton>
          <Text>LEVEL</Text>
        </Skeleton>
      </Flex>
      <Skeleton>
        <Progress size="lg" />
      </Skeleton>
    </Box>
    <Center mb={6}>
      <Skeleton height="50px" width="50px" mx={3} />
      <Skeleton height="50px" width="50px" mx={3} />
    </Center>
  </Box>
);

export default UserProfileAchievementsPlaceholder;
