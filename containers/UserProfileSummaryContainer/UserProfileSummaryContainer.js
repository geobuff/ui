import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

import useMapping from "../../hooks/UseMapping";
import UserProfileSummary from "../../components/UserProfileSummary";
import UserProfileSummaryPlaceholder from "../../placeholders/UserProfileSummaryPlaceholder";
import axiosClient from "../../axios/axiosClient";
import useCurrentUser from "../../hooks/UseCurrentUser";

const UserProfileSummaryContainer = ({ user, quizzes }) => {
  const quizId =
    quizzes.find((quiz) => quiz.apiPath === "world-countries")?.id || "";
  const { mapping: countries, loading } = useMapping(quizId);

  const { updateUser } = useCurrentUser();

  const [config, setConfig] = useState(null);
  const [updated, setUpdated] = useState(false);

  const sortedCountries = useMemo(
    () => countries?.sort((a, b) => a.svgName.localeCompare(b.svgName)),
    [countries]
  );

  useEffect(() => {
    if (user) {
      setConfig({
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
  }, [user]);

  const submitCountry = (code) => {
    const update = {
      ...user,
      countryCode: code,
    };

    axiosClient.put(`/users/${user.id}`, update, config).then((response) => {
      const updatedUser = { ...user, countryCode: response.data.countryCode };
      updateUser(updatedUser);
      setUpdated(true);
    });
  };

  if (loading) {
    return <UserProfileSummaryPlaceholder />;
  }

  return (
    <UserProfileSummary
      user={user}
      countries={sortedCountries}
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
