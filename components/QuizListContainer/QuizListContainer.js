import React from "react";
import useSWR from "swr";
import { fetcher } from "../../helpers/fetcher";
import { Text } from "@chakra-ui/core";
import QuizList from "../QuizList";

const QuizListContainer = () => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes`,
    fetcher
  );

  if (!data) {
    return <Text>Loading quizzes...</Text>;
  }

  return <QuizList quizzes={data} />;
};

export default QuizListContainer;
