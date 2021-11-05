import React, { FC } from "react";
import {
  Box,
  Tooltip,
  Image,
  Flex,
  Text,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

import Card from "../Card";

import { isBadgeComplete, getProgress } from "../../helpers/badge";

import SolidLock from "../../Icons/SolidLock";
import { Badge } from "../../types/badge";
import { UserLeaderboardEntry } from "../../types/user-leaderboard-entry";

interface Props {
  badges?: Badge[];
  entries?: UserLeaderboardEntry[];
}

const UserProfileAchievements: FC<Props> = ({ badges = [], entries = [] }) => {
  const getLabel = (badge: Badge): React.ReactNode => (
    <Box>
      <Heading size="md">{badge.name}</Heading>
      <Text my={2}>{badge.description}</Text>
      <Text mb={2}>{`Progress: ${getProgress(badge, entries)}/${
        badge.total
      }`}</Text>
    </Box>
  );

  return (
    <Card padding={6}>
      <Heading fontSize="26px" textAlign="left" marginLeft={2} marginBottom={8}>
        {"Achievements"}
      </Heading>

      <Flex direction="column" justifyContent="center" marginX={2}>
        <SimpleGrid
          mb={6}
          justifyContent="center"
          minChildWidth="75px"
          spacingY={8}
          spacingX={5}
        >
          {badges.map((badge) => (
            <Tooltip key={badge.id} label={getLabel(badge)}>
              <Box position="relative">
                <Box
                  borderRadius={50}
                  backgroundColor={badge.background || "gray.200"}
                  border="solid 5px"
                  borderColor={badge.border || "gray.600"}
                  padding={3}
                  height="75px"
                  width="75px"
                >
                  <Image
                    src={badge.imageUrl}
                    height="40px"
                    width="40px"
                    marginX="auto"
                  />
                </Box>
                {!isBadgeComplete(badge, entries) && (
                  <Box
                    position="absolute"
                    borderRadius={50}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    opacity={0.75}
                    backgroundColor="#292929"
                    width="75px"
                    height="75px"
                  >
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      height="100%"
                      width="100%"
                    >
                      <SolidLock height="26px" width="26px" color="white" />
                    </Flex>
                  </Box>
                )}
              </Box>
            </Tooltip>
          ))}
        </SimpleGrid>
      </Flex>
    </Card>
  );
};

export default UserProfileAchievements;
