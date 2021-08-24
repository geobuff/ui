import React, { useEffect, FC } from "react";
import { useRouter } from "next/router";

import useQuizzes from "../../hooks/UseQuizzes";
import GameMapQuizContainer from "../../containers/GameMapQuizContainer";
import GameFlagQuizContainer from "../../containers/GameFlagQuizContainer";
import MainView from "../../components/MainView";

import { QuizTypes } from "../../helpers/quiz-type";
import useCurrentUser from "../../hooks/UseCurrentUser";

const Quiz: FC = () => {
  const { quizzes, isLoading } = useQuizzes();
  const router = useRouter();
  const { id } = router.query;

  const {
    user,
    isLoading: isUserLoading,
    clearUser,
    tokenExpired,
  } = useCurrentUser();

  useEffect(() => {
    if (!isUserLoading && user && tokenExpired(user.token)) {
      clearUser();
      router.push("/login");
    }
  }, [isUserLoading, user, tokenExpired, clearUser, router]);

  if (isLoading) {
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

  return (
    <MainView hasFooter={false} backgroundColor="#276F86">
      {getQuizComponent()}
    </MainView>
  );
};

export default Quiz;
