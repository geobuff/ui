import React from "react";
import PropTypes from "prop-types";
import useSWR from "swr";
import { Text } from "@chakra-ui/react";
import { authFetcher } from "../../helpers/fetcher";
import UserProfileScores from "../../components/UserProfileScores";

const UserProfileScoresContainer = ({ token, id }) => {
  const { data } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/scores/${id}`, token],
    authFetcher
  );

  if (!data) {
    return <Text>Loading scores...</Text>;
  }

  return <UserProfileScores scores={data} />;
};

UserProfileScoresContainer.propTypes = {
  token: PropTypes.string,
  id: PropTypes.number,
};

export default UserProfileScoresContainer;
