import React from "react";
import PropTypes from "prop-types";
import useSWR from "swr";
import { fetcher } from "../../helpers/fetcher";
import { Text } from "@chakra-ui/core";
import QuizList from "../QuizList";

const QuizListContainer = ({ search }) => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes?search=${search}`,
    fetcher
  );

  if (!data) {
    return <Text>Loading quizzes...</Text>;
  }

  return <QuizList quizzes={data} />;
};

QuizListContainer.propTypes = {
  search: PropTypes.string,
};
QuizListContainer.defaultProps = {
  search: "",
};

export default QuizListContainer;
