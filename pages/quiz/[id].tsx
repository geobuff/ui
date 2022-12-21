import React, { FC, useContext } from "react";

import { AppProps } from "next/app";

import { LanguageContext } from "../../contexts/LanguageContext";

import { GameQuizContainer } from "../../containers/GameQuizContainer/GameQuizContainer";

import { GameQuiz } from "../../components/GameQuiz/GameQuiz";

import axiosClient from "../../axios";
import { QuizzesFilterDto } from "../../types/quizzes-filter-dto";

const Quiz: FC<AppProps> = ({ pageProps }) => {
  const { language } = useContext(LanguageContext);

  return language === "en" ? (
    <GameQuiz quiz={pageProps.quiz} mapping={pageProps.mapping} />
  ) : (
    <GameQuizContainer
      quizRoute={pageProps.quiz.route}
      mappingKey={pageProps.quiz.apiPath}
    />
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
      mapping,
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
