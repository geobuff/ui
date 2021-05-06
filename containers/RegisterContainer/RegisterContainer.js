import React, { useEffect } from "react";
import PropTypes from "prop-types";

import useMapping from "../../hooks/UseMapping";
import Register from "../../components/Register";
import useCurrentUser from "../../hooks/UseCurrentUser";
import { useRouter } from "next/router";

const RegisterContainer = ({ quizzes }) => {
  const router = useRouter();
  const { user, isLoading: isLoadingUser } = useCurrentUser();

  const quizId =
    quizzes.find((quiz) => quiz.apiPath === "world-countries")?.id || "";
  const { mapping: countries, isLoading: isMappingLoading } = useMapping(
    quizId
  );

  useEffect(() => {
    if (!isLoadingUser && user) {
      router.push("/");
    }
  }, [isLoadingUser, user, router]);

  if (isMappingLoading || isLoadingUser || user) {
    return null;
  }

  return <Register countries={countries} />;
};

RegisterContainer.propTypes = {
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
RegisterContainer.defaultProps = {
  quizzes: [],
};

export default RegisterContainer;
