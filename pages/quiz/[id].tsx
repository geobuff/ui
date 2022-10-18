import React, { FC } from "react";

import MainView from "../../components/MainView";
import { QuizTypes } from "../../types/quiz-types";
import { QuizzesFilterDto } from "../../types/quizzes-filter-dto";
import axiosClient from "../../axios";
import GameFlagQuizContainer from "../../containers/GameFlagQuizContainer";
import { MappingEntry } from "../../types/mapping-entry";
import GameMapQuiz from "../../components/GameMapQuiz";
import { QuizDto } from "../../types/quiz-dto";

interface Props {
  [x: string]: any;
}

const Quiz: FC<Props> = ({ ...pageProps }) => {
  const quiz: QuizDto = pageProps.pageProps.quiz;
  const mapping: MappingEntry[] = pageProps.pageProps.mapping;

  const getQuizComponent = (): React.ReactNode => {
    switch (quiz.typeId) {
      case QuizTypes.MAP:
        return (
          <GameMapQuiz
            time={quiz?.time}
            name={quiz?.name}
            typeId={quiz?.typeId}
            maxScore={quiz?.maxScore}
            plural={quiz?.plural}
            route={quiz?.route}
            id={quiz?.id}
            mapping={mapping}
            map={quiz?.map}
            mapClassName={quiz?.mapName}
            hasLeaderboard={quiz?.hasLeaderboard}
            hasFlags={quiz?.hasFlags}
            hasGrouping={quiz?.hasGrouping}
          />
        );
      case QuizTypes.FLAG:
        return <GameFlagQuizContainer quiz={quiz} mapping={mapping} />;
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

const getQuizData = async (route: string) => {
  const quizRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/route/${route}`
  );

  const quiz = await quizRes.json();

  if (quiz) {
    const mappingRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/mappings/${quiz.apiPath}`
    );

    const mapping = await mappingRes.json();

    return {
      quiz,
      mapping:
        mapping?.map((mapping) => ({
          ...mapping,
          flagUrl: mapping.flagUrl.Valid ? mapping.flagUrl.String : "",
          alternativeNames: mapping.alternativeNames.map((altName) =>
            altName.toLowerCase()
          ),
          prefixes: mapping.prefixes.map((prefix) => prefix.toLowerCase()),
        })) || [],
    };
  }

  return undefined;
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
    limit: 150,
    orderByPopularity: false,
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
