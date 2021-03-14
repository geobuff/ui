import React from "react";
import PropTypes from "prop-types";

import UserProfileScores from "../../components/UserProfileScores";
import useScores from "../../hooks/UseScores";
import UserProfileScoresPlaceholder from "../../placeholders/UserProfileScoresPlaceholder";

const UserProfileScoresContainer = ({ userId }) => {
  const { scores, isLoading } = useScores(userId);

  if (isLoading) {
    return <UserProfileScoresPlaceholder />;
  }

  return <UserProfileScores scores={scores} />;
};

UserProfileScoresContainer.propTypes = {
  userId: PropTypes.number,
};

export default UserProfileScoresContainer;
