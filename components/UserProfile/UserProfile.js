import React from "react";
import PropTypes from "prop-types";
import { Box, Divider } from "@chakra-ui/react";
import UserProfileScoresContainer from "../../containers/UserProfileScoresContainer";
import UserProfileLeaderboardEntriesContainer from "../../containers/UserProfileLeaderboardEntriesContainer";
import UserProfileSummaryContainer from "../../containers/UserProfileSummaryContainer";
import UserProfileAchievementsContainer from "../../containers/UserProfileAchievementsContainer";

const divider = <Divider my={3} />;

const UserProfile = ({ user }) => (
  <Box m={5}>
    <Box
      borderRadius={12}
      p={5}
      background="#FFFFFF"
      w={{ base: "100%", lg: "50%" }}
      mx="auto"
    >
      <UserProfileSummaryContainer user={user} />
      {divider}
      <UserProfileAchievementsContainer user={user} />
      {divider}
      <UserProfileLeaderboardEntriesContainer userId={user.id} />
      {divider}
      <UserProfileScoresContainer userId={user.id} />
    </Box>
  </Box>
);

UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    countryCode: PropTypes.string,
    xp: PropTypes.number,
    email: PropTypes.string,
    picture: PropTypes.string,
  }),
};

export default UserProfile;
