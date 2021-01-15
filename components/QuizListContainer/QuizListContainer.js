import React from "react";
import PropTypes from "prop-types";
import useSWR from "swr";
import { fetcher } from "../../helpers/fetcher";
import { Text } from "@chakra-ui/core";
import QuizList from "../QuizList";

const QuizListContainer = ({ filter }) => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes?filter=${filter}`,
    fetcher
  );

  if (!data) {
    return <Text>Loading quizzes...</Text>;
  }

  return <QuizList quizzes={data} />;
};

QuizListContainer.propTypes = {
  filter: PropTypes.string,
};
QuizListContainer.defaultProps = {
  filter: "",
};

export default QuizListContainer;
