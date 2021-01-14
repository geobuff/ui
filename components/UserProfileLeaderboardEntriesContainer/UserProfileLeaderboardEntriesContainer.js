import React from "react";
import PropTypes from "prop-types";
import useSWR from "swr";
import { Text } from "@chakra-ui/core";
import { authFetcher } from "../../helpers/fetcher";
import UserProfileLeaderboardEntries from "../UserProfileLeaderboardEntries";

const UserProfileLeaderboardEntriesContainer = ({ token, id }) => {
  const { data } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/countries/leaderboard/${id}`, token],
    authFetcher
  );

  if (!data) {
    return <Text>Loading leaderboard entries...</Text>;
  }

  return <UserProfileLeaderboardEntries entries={data} />;
};

UserProfileLeaderboardEntriesContainer.propTypes = {
  token: PropTypes.string,
  id: PropTypes.number,
};

export default UserProfileLeaderboardEntriesContainer;
