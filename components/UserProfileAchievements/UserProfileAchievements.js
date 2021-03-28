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
  Center,
  Heading,
} from "@chakra-ui/react";

import { getLevel, getLevelCompletion } from "../../helpers/gamification";

const UserProfileAchievements = ({ user, badges, userBadges }) => {
  const level = getLevel(user.xp);

  const getOpacity = (badge) => {
    const filter = userBadges.filter((x) => x.badgeId === badge.id);
    if (filter.length === 0) {
      return "0.25";
    }
    return filter[0].progress === badge.total ? "1" : "0.25";
  };

  const getLabel = (badge) => {
    const filter = userBadges.filter((x) => x.badgeId === badge.id);
    const progress = filter.length === 0 ? 0 : filter[0].progress;
    return (
      <Box>
        <Heading size="md">{badge.name}</Heading>
        <Text my={2}>{badge.description}</Text>
        <Text mb={2}>{`Progress: ${progress}/${badge.total}`}</Text>
      </Box>
    );
  };

  return (
    <Box>
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
      <Center mb={6}>
        {badges.map((badge) => (
          <Tooltip key={badge.id} label={getLabel(badge)}>
            <Image
              src={badge.icon}
              height="50px"
              mx={3}
              opacity={getOpacity(badge)}
            />
          </Tooltip>
        ))}
      </Center>
    </Box>
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
  userBadges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      badgeId: PropTypes.number,
      progress: PropTypes.number,
    })
  ),
};

export default UserProfileAchievements;
