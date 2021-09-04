import React, { useEffect, FC, useContext } from "react";
import { useRouter } from "next/router";

import useQuizzes from "../../hooks/UseQuizzes";
import GameMapQuizContainer from "../../containers/GameMapQuizContainer";
import GameFlagQuizContainer from "../../containers/GameFlagQuizContainer";
import MainView from "../../components/MainView";

import { QuizType } from "../../types/quiz-type";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const Quiz: FC = () => {
  const { quizzes, isLoading } = useQuizzes();
  const router = useRouter();
  const { id } = router.query;

  const {
    user,
    isLoading: isUserLoading,
    clearUser,
    tokenExpired,
  } = useContext(CurrentUserContext);

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

  const getQuizComponent = (): React.ReactNode => {
    switch (matchedQuiz.type) {
      case QuizType.MAP:
        return <GameMapQuizContainer quizId={matchedQuiz.id} />;
      case QuizType.FLAG:
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
