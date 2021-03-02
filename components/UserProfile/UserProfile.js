import React from "react";
import PropTypes from "prop-types";
import { Box, Divider } from "@chakra-ui/react";
import UserProfileSummary from "../UserProfileSummary";
import UserProfileScoresContainer from "../../containers/UserProfileScoresContainer/UserProfileScoresContainer";
import UserProfileLeaderboardEntriesContainer from "../../containers/UserProfileLeaderboardEntriesContainer/UserProfileLeaderboardEntriesContainer";

const UserProfile = ({ imageUrl, token, id, username, email }) => (
  <Box m={5}>
    <Box
      borderRadius={12}
      p={5}
      background="#FFFFFF"
      w={{ base: "100%", lg: "50%" }}
      mx="auto"
    >
      <UserProfileSummary
        imageUrl={imageUrl}
        username={username}
        email={email}
      />
      <Divider my={3} />
      <UserProfileLeaderboardEntriesContainer id={id} />
      <Divider my={3} />
      <UserProfileScoresContainer token={token} id={id} />
    </Box>
  </Box>
);

UserProfile.propTypes = {
  imageUrl: PropTypes.string,
  token: PropTypes.string,
  id: PropTypes.number,
  username: PropTypes.string,
  email: PropTypes.string,
};

export default UserProfile;
