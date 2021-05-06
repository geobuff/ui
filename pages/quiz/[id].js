import React from "react";
import { useRouter } from "next/router";

import useQuizzes from "../../hooks/UseQuizzes";
import GameMapQuizContainer from "../../containers/GameMapQuizContainer";
import GameFlagQuizContainer from "../../containers/GameFlagQuizContainer";
import MainView from "../../components/MainView";

import { QuizTypes } from "../../helpers/quiz-type";

const Quiz = () => {
  const { quizzes, loading } = useQuizzes();
  const router = useRouter();
  const { id } = router.query;

  if (loading) {
    return null;
  }

  const matchedQuiz = quizzes.find((x) => x.route === id);

  if (!matchedQuiz) {
    return null;
  }

  const getQuizComponent = () => {
    switch (matchedQuiz.type) {
      case QuizTypes.MAP:
        return <GameMapQuizContainer quizId={matchedQuiz.id} />;
      case QuizTypes.FLAG:
        return <GameFlagQuizContainer quizId={matchedQuiz.id} />;
      default:
        return null;
    }
  };

  return <MainView hasFooter={false}>{getQuizComponent()}</MainView>;
};

export default Quiz;
