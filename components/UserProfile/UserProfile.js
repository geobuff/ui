import React from "react";
import PropTypes from "prop-types";
import { Box, Divider } from "@chakra-ui/core";
import UserProfileSummary from "../UserProfileSummary";
import UserProfileScoresContainer from "../../containers/UserProfileScoresContainer/UserProfileScoresContainer";
import UserProfileLeaderboardEntriesContainer from "../../containers/UserProfileLeaderboardEntriesContainer/UserProfileLeaderboardEntriesContainer";

const UserProfile = ({ token, id, username, email, quizzes }) => (
  <Box m={5}>
    <UserProfileSummary username={username} email={email} />
    <Divider my={3} />
    <UserProfileScoresContainer token={token} id={id} />
    <Divider my={3} />
    <UserProfileLeaderboardEntriesContainer id={id} quizzes={quizzes} />
  </Box>
);

UserProfile.propTypes = {
  token: PropTypes.string,
  id: PropTypes.number,
  username: PropTypes.string,
  email: PropTypes.string,
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      code: PropTypes.string,
      maxScore: PropTypes.number,
      enabled: PropTypes.bool,
    })
  ),
};

export default UserProfile;
