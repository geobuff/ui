import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Tooltip,
  Image,
  Flex,
  Text,
  Spacer,
  Progress,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

import Card from "../Card";

import { getLevel, getLevelCompletion } from "../../helpers/gamification";
import { isBadgeComplete, getProgress } from "../../helpers/badge";

const UserProfileAchievements = ({ user, badges, scores, entriesCount }) => {
  const level = getLevel(user.xp);

  const getLabel = (badge) => {
    return (
      <Box>
        <Heading size="md">{badge.name}</Heading>
        <Text my={2}>{badge.description}</Text>
        <Text mb={2}>{`Progress: ${getProgress(badge, scores, entriesCount)}/${
          badge.total
        }`}</Text>
      </Box>
    );
  };

  return (
    <Card>
      <Heading size="md" textAlign="center" m={6}>
        Achievements
      </Heading>
      <Box mt={6} mb={12}>
        <Flex mb={3}>
          <Text fontWeight="bold">{level}</Text>
          <Spacer />
          <Text fontWeight="bold">{level + 1}</Text>
        </Flex>
        <Progress
          hasStripe
          size="lg"
          value={getLevelCompletion(user.xp)}
          colorScheme="green"
        />
      </Box>
      <SimpleGrid
        mb={6}
        justifyContent="center"
        minChildWidth="75px"
        spacingY={8}
      >
        {badges.map((badge) => (
          <Tooltip key={badge.id} label={getLabel(badge)}>
            <Image
              src={badge.icon}
              height="50px"
              mx={3}
              opacity={
                isBadgeComplete(badge, scores, entriesCount) ? "1" : "0.25"
              }
            />
          </Tooltip>
        ))}
      </SimpleGrid>
    </Card>
  );
};

UserProfileAchievements.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    countryCode: PropTypes.string,
    xp: PropTypes.number,
    email: PropTypes.string,
    picture: PropTypes.string,
  }),
  badges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.string,
      total: PropTypes.number,
    })
  ),
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      quizId: PropTypes.number,
      badgeGroup: PropTypes.number,
      quizName: PropTypes.string,
      quizImageUrl: PropTypes.string,
      quizMaxScore: PropTypes.number,
      score: PropTypes.number,
      time: PropTypes.number,
      added: PropTypes.time,
    })
  ),
  entriesCount: PropTypes.number,
};

export default UserProfileAchievements;
