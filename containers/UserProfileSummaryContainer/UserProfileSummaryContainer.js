import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

import useMapping from "../../hooks/UseMapping";
import UserProfileSummary from "../../components/UserProfileSummary";

const UserProfileSummaryContainer = ({ user, quizzes }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const quizId = quizzes.filter((x) => x.apiPath === "countries")[0].id;
  const { mapping: countries, loading } = useMapping(quizId);

  const [token, setToken] = useState();
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    }).then((token) => {
      setToken(token);
    });
  }, [isAuthenticated]);

  const submitCountry = (code) => {
    const update = {
      ...user,
      countryCode: code,
    };

    const params = {
      method: "PUT",
      body: JSON.stringify(update),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, params)
      .then((response) => response.json())
      .then(() => {
        setUpdated(true);
      });
  };

  if (loading) {
    return <Text>Loading summary...</Text>;
  }

  return (
    <UserProfileSummary
      user={user}
      countries={countries}
      submitCountry={submitCountry}
      updated={updated}
      setUpdated={setUpdated}
    />
  );
};

UserProfileSummaryContainer.propTypes = {
  user: PropTypes.object,
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      maxScore: PropTypes.number,
      time: PropTypes.number,
      mapSVG: PropTypes.string,
      imageUrl: PropTypes.string,
      verb: PropTypes.string,
      apiPath: PropTypes.string,
      route: PropTypes.string,
      hasLeaderboard: PropTypes.bool,
      hasGrouping: PropTypes.bool,
      enabled: PropTypes.bool,
    })
  ),
};

export default UserProfileSummaryContainer;
