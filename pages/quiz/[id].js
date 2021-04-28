import React from "react";
import { useRouter } from "next/router";

import useQuizzes from "../../hooks/UseQuizzes";
import GameMapQuizContainer from "../../containers/GameMapQuizContainer";
import GameFlagQuizContainer from "../../containers/GameFlagQuizContainer";

import { QuizTypes } from "../../helpers/quiz-type";

const Quiz = () => {
  const { quizzes, loading } = useQuizzes();
  const router = useRouter();
  const { id } = router.query;

  if (loading) {
    return null;
  }

  const filter = quizzes.filter((x) => x.route === id);
  if (filter.length === 0) {
    return null;
  }

  const quiz = filter[0];
  switch (quiz.type) {
    case QuizTypes.MAP:
      return <GameMapQuizContainer quizId={quiz.id} />;
    case QuizTypes.FLAG:
      return <GameFlagQuizContainer quizId={quiz.id} />;
    default:
      return null;
  }
};

export default Quiz;
