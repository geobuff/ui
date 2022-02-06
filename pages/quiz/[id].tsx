import React, { useEffect, FC, useContext } from "react";
import { useRouter } from "next/router";
import * as Maps from "@geobuff/svg-maps";

import MainView from "../../components/MainView";

import { QuizTypes } from "../../types/quiz-types";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import GameMapQuiz from "../../components/GameMapQuiz";
import GameFlagQuiz from "../../components/GameFlagQuiz";
import { FlagGameContextProvider } from "../../context/FlagGameContext";
import { QuizzesFilterDto } from "../../types/quizzes-filter-dto";
import axiosClient from "../../axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getQuizData = async (id: string) => {
  const body: QuizzesFilterDto = {
    filter: "",
    page: 0,
    limit: 100,
  };

  const { data } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
    body
  );

  const matchedQuiz = data.quizzes.find((x) => x.route === id);

  if (matchedQuiz) {
    const quizRes = await fetch(`${baseUrl}/quizzes/${matchedQuiz.id}`);
    const mappingRes = await fetch(
      `${baseUrl}/mappings/${matchedQuiz.apiPath}`
    );

    const quiz = await quizRes.json();
    const mapping = await mappingRes.json();

    return {
      quiz,
      mapping:
        mapping?.map((mapping) => ({
          ...mapping,
          alternativeNames: mapping.alternativeNames.map((altName) =>
            altName.toLowerCase()
          ),
          prefixes: mapping.prefixes.map((prefix) => prefix.toLowerCase()),
        })) || [],
    };
  } else {
    return undefined;
  }
};

interface Props {
  [x: string]: any;
}

const Quiz: FC<Props> = ({ ...pageProps }) => {
  const quiz = pageProps.pageProps.quiz;
  const mapping = pageProps.pageProps.mapping;

  const router = useRouter();

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

  const getQuizComponent = (): React.ReactNode => {
    switch (quiz.typeId) {
      case QuizTypes.MAP:
        return (
          <GameMapQuiz
            time={quiz?.time}
            name={quiz?.name}
            typeId={quiz?.typeId}
            maxScore={quiz?.maxScore}
            verb={quiz?.verb}
            route={quiz?.route}
            id={quiz?.id}
            mapping={mapping}
            map={Maps[`${quiz.mapSVG}`]}
            hasLeaderboard={quiz?.hasLeaderboard}
            hasFlags={quiz?.hasFlags}
            hasGrouping={quiz?.hasGrouping}
          />
        );
      case QuizTypes.FLAG:
        return (
          <FlagGameContextProvider>
            <GameFlagQuiz
              id={quiz.id}
              time={quiz.time}
              name={quiz.name}
              typeId={quiz.typeId}
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

  const { quiz, mapping } = await getQuizData(id);

  return {
    props: {
      quiz,
      mapping,
    },
  };
}

export async function getStaticPaths() {
  const body: QuizzesFilterDto = {
    filter: "",
    page: 0,
    limit: 100,
  };

  const { data } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
    body
  );

  const paths = data.quizzes.map((quiz) => ({
    params: {
      id: quiz.route,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default Quiz;
