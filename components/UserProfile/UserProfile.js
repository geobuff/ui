import React from "react";
import PropTypes from "prop-types";
import { Box, Divider } from "@chakra-ui/react";
import UserProfileScoresContainer from "../../containers/UserProfileScoresContainer/UserProfileScoresContainer";
import UserProfileLeaderboardEntriesContainer from "../../containers/UserProfileLeaderboardEntriesContainer/UserProfileLeaderboardEntriesContainer";
import UserProfileSummaryContainer from "../../containers/UserProfileSummaryContainer/UserProfileSummaryContainer";

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
      <Divider my={3} />
      <UserProfileLeaderboardEntriesContainer userId={user.id} />
      <Divider my={3} />
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
