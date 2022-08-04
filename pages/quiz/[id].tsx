import React, { FC } from "react";

import MainView from "../../components/MainView";
import { QuizTypes } from "../../types/quiz-types";
import { QuizzesFilterDto } from "../../types/quizzes-filter-dto";
import axiosClient from "../../axios";
import GameFlagQuizContainer from "../../containers/GameFlagQuizContainer";
import GameMapQuizContainer from "../../containers/GameMapQuizContainer";
import { MappingEntry } from "../../types/mapping-entry";
import { Quiz } from "../../types/quiz";

const getQuizData = async (id: string) => {
  const body: QuizzesFilterDto = {
    filter: "",
    page: 0,
    limit: 100,
    orderByPopularity: false,
  };

  const { data } = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes/all`,
    body
  );

  const matchedQuiz = data.quizzes.find((x) => x.route === id);

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
  const quiz: Quiz = pageProps.pageProps.quiz;
  const mapping: MappingEntry[] = pageProps.pageProps.mapping;

  const getQuizComponent = (): React.ReactNode => {
    switch (quiz.typeId) {
      case QuizTypes.MAP:
        return <GameMapQuizContainer quiz={quiz} mapping={mapping} />;
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
