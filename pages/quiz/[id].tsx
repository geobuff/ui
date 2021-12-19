import React, { useEffect, FC, useContext } from "react";
import { useRouter } from "next/router";
import * as Maps from "@geobuff/svg-maps";

import useQuizzes from "../../hooks/UseQuizzes";
import GameMapQuizContainer from "../../containers/GameMapQuizContainer";
import GameFlagQuizContainer from "../../containers/GameFlagQuizContainer";
import MainView from "../../components/MainView";

import { QuizType } from "../../types/quiz-type";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useUserAgent } from "next-useragent";
import GameMapQuiz from "../../components/GameMapQuiz";
import GameFlagQuiz from "../../components/GameFlagQuiz";
import { FlagGameContextProvider } from "../../context/FlagGameContext";

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
  const quiz = pageProps.pageProps.quiz;
  const mapping = pageProps.pageProps.mapping;
  // console.log(quiz, "quiz:pageProps");
  // console.log(mapping, "quiz:mapping");

  const nextUserAgent = useUserAgent(pageProps?.uaString);
  // const { quizzes, isLoading } = useQuizzes();
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

  // if (isLoading) {
  //   return null;
  // }

  const getQuizComponent = (): React.ReactNode => {
    switch (quiz.type) {
      case QuizType.MAP:
        return (
          <GameMapQuiz
            time={quiz?.time}
            name={quiz?.name}
            type={quiz?.type}
            maxScore={quiz?.maxScore}
            verb={quiz?.verb}
            route={quiz?.route}
            id={quiz?.id || "1"}
            mapping={mapping || []}
            map={Maps[`${quiz.mapSVG}`]}
            hasLeaderboard={quiz?.hasLeaderboard}
            hasFlags={quiz?.hasFlags}
            hasGrouping={quiz?.hasGrouping}
          />
        );
      case QuizType.FLAG:
        return (
          <FlagGameContextProvider>
            <GameFlagQuiz
              id={quiz.id}
              time={quiz.time}
              name={quiz.name}
              type={quiz.type}
              maxScore={quiz.maxScore}
              verb={quiz.verb}
              route={quiz.route}
              hasLeaderboard={quiz.hasLeaderboard}
              hasFlags={quiz.hasFlags}
              hasGrouping={quiz.hasGrouping}
              mapping={mapping}
            />
          </FlagGameContextProvider>
        );
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

export async function getStaticProps({ params }) {
  const { id } = params;

  // console.log(id, "params");

  const quizzesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`);
  const quizzes = await quizzesRes.json();

  const matchedQuiz = quizzes.find((x) => x.route === id);

  if (matchedQuiz) {
    const quizRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${matchedQuiz.id}`
    );
    const mappingRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/mappings/${matchedQuiz.apiPath}`
    );

    const quiz = await quizRes.json();
    const mapping = await mappingRes.json();

    return {
      props: { quiz, mapping },
    };
  }

  return {
    props: { quiz: null, mapping: [] },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes`);
  const quizzes = await res.json();

  const paths = quizzes.map((quiz) => ({
    params: {
      id: quiz.route,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

// export const getServerSideProps = (context: Context): ServerSideProps => {
//   return {
//     props: {
//       uaString: context.req.headers["user-agent"],
//     },
//   };
// };

export default Quiz;
