import React from "react";
import { useRouter } from "next/router";

import GameMapQuizContainer from "../../containers/GameMapQuizContainer";

import { getIdByRoute } from "../../helpers/quizzes";

const Quiz = () => {
  const router = useRouter();
  const { id } = router.query;

  const quizId = getIdByRoute(id);

  switch (id) {
    case "countries-of-the-world":
    case "capitals-of-the-world":
    case "us-states":
    case "uk-counties":
      return <GameMapQuizContainer id={quizId} />;
    default:
      return null;
  }
};

export default Quiz;
