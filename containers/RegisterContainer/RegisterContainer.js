import React from "react";

import useQuizzes from "../../hooks/UseQuizzes";
import useMapping from "../../hooks/UseMapping";
import Register from "../../components/Register";

const RegisterContainer = () => {
  const { quizzes, isLoading: isQuizzesLoading } = useQuizzes();

  if (isQuizzesLoading) {
    return null;
  }

  const quizId = quizzes.filter((x) => x.apiPath === "world-countries")[0].id;
  const { mapping: countries, isLoading: isMappingLoading } = useMapping(
    quizId
  );

  if (isMappingLoading) {
    return null;
  }

  return <Register countries={countries} />;
};

export default RegisterContainer;
