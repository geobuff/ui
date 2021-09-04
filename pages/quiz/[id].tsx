import React, { useEffect, FC, useContext } from "react";
import { useRouter } from "next/router";

import useQuizzes from "../../hooks/UseQuizzes";
import GameMapQuizContainer from "../../containers/GameMapQuizContainer";
import GameFlagQuizContainer from "../../containers/GameFlagQuizContainer";
import MainView from "../../components/MainView";

import { QuizType } from "../../types/quiz-type";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useUserAgent } from "next-useragent";

interface ServerSideProps {
  props: {
    uaString: string;
  };
}

type Context = { [x: string]: any };

interface Props {
  [x: string]: any;
}

const Quiz: FC<Props> = ({ ...pageProps }) => {
  const nextUserAgent = useUserAgent(pageProps?.uaString);
  const { quizzes, isLoading } = useQuizzes();
  const router = useRouter();
  const { id } = router.query;

  const {
    user,
    isLoading: isUserLoading,
    clearUser,
    tokenExpired,
    userAgent: contextUserAgent,
    updateUserAgent,
  } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!contextUserAgent && nextUserAgent) {
      updateUserAgent(nextUserAgent);
    }
  }, [updateUserAgent, nextUserAgent, contextUserAgent]);

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

export const getServerSideProps = (context: Context): ServerSideProps => {
  return {
    props: {
      uaString: context.req.headers["user-agent"],
    },
  };
};

export default Quiz;
