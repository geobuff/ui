import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";

import useMapping from "../../hooks/UseMapping";
import UserProfileSummary from "../../components/UserProfileSummary";
import UserProfileSummaryPlaceholder from "../../placeholders/UserProfileSummaryPlaceholder";
import axiosClient from "../../axios/axiosClient";

const UserProfileSummaryContainer = ({ user, quizzes }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const quizId = quizzes.filter((x) => x.apiPath === "world-countries")[0].id;
  const { mapping: countries, loading } = useMapping(quizId);

  const [config, setConfig] = useState(null);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    }).then((token) => {
      setConfig({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
  }, [isAuthenticated]);

  const submitCountry = (code) => {
    const update = {
      ...user,
      countryCode: code,
    };

    axiosClient.put(`/users/${user.id}`, update, config).then(() => {
      setUpdated(true);
    });
  };

  if (loading) {
    return <UserProfileSummaryPlaceholder />;
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
