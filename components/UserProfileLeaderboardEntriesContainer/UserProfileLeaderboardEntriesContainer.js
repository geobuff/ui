import React from "react";
import PropTypes from "prop-types";
import useSWR from "swr";
import { Text } from "@chakra-ui/core";
import { fetcher } from "../../helpers/fetcher";
import UserProfileLeaderboardEntries from "../UserProfileLeaderboardEntries";

const UserProfileLeaderboardEntriesContainer = ({ id, quizzes }) => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/countries/leaderboard/${id}`,
    fetcher
  );

  if (!data) {
    return <Text>Loading leaderboard entries...</Text>;
  }

  data.quizId = 1;
  return <UserProfileLeaderboardEntries entries={[data]} quizzes={quizzes} />;
};

UserProfileLeaderboardEntriesContainer.propTypes = {
  id: PropTypes.number,
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

export default UserProfileLeaderboardEntriesContainer;
