import React from "react";

import useQuizzes from "../../hooks/UseQuizzes";
import useMapping from "../../hooks/UseMapping";
import Register from "../../components/Register";

const RegisterContainer = () => {
  const { quizzes, isLoading: isQuizzesLoading } = useQuizzes();

  if (isQuizzesLoading) {
    return null;
  }

  const quizId =
    quizzes.find((quiz) => quiz.apiPath === "world-countries")?.id || "";
  const { mapping: countries, isLoading: isMappingLoading } = useMapping(
    quizId
  );

  if (isMappingLoading) {
    return null;
  }

  return <Register countries={countries} />;
};

export default RegisterContainer;
