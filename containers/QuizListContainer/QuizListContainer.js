import React from "react";
import PropTypes from "prop-types";
import useSWR from "swr";
import { fetcher } from "../../helpers/fetcher";
import QuizList from "../../components/QuizList";

const QuizListContainer = ({ filter }) => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/quizzes?filter=${filter}`,
    fetcher
  );

  if (!data) {
    return null;
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
