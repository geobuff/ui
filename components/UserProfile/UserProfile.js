import React from "react";
import PropTypes from "prop-types";
import { Box, Divider } from "@chakra-ui/react";
import UserProfileSummary from "../UserProfileSummary";
import UserProfileScoresContainer from "../../containers/UserProfileScoresContainer/UserProfileScoresContainer";
import UserProfileLeaderboardEntriesContainer from "../../containers/UserProfileLeaderboardEntriesContainer/UserProfileLeaderboardEntriesContainer";

const UserProfile = ({ token, id, username, email }) => (
  <Box m={5}>
    <UserProfileSummary username={username} email={email} />
    <Divider my={3} />
    <UserProfileScoresContainer token={token} id={id} />
    <Divider my={3} />
    <UserProfileLeaderboardEntriesContainer id={id} />
  </Box>
);

UserProfile.propTypes = {
  token: PropTypes.string,
  id: PropTypes.number,
  username: PropTypes.string,
  email: PropTypes.string,
};

export default UserProfile;
