import React from "react";
import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";

import UserProfileScores from "../../components/UserProfileScores";

import useScores from "../../hooks/UseScores";

const UserProfileScoresContainer = ({ userId }) => {
  const { scores, isLoading } = useScores(userId);

  if (isLoading) {
    return <Text>Loading scores...</Text>;
  }

  return <UserProfileScores scores={scores} />;
};

UserProfileScoresContainer.propTypes = {
  userId: PropTypes.number,
};

export default UserProfileScoresContainer;
