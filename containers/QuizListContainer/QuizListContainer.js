import React from "react";
import PropTypes from "prop-types";

import QuizList from "../../components/QuizList";
import useQuizzes from "../../hooks/UseQuizzes";
import QuizListPlaceholder from "../../placeholders/QuizListPlaceholder/QuizListPlaceholder";

const QuizListContainer = ({ filter }) => {
  const { quizzes, isLoading } = useQuizzes(filter);

  if (isLoading) {
    return <QuizListPlaceholder noOfTiles={8} />;
  }

  return <QuizList quizzes={quizzes} />;
};

QuizListContainer.propTypes = {
  filter: PropTypes.string,
};
QuizListContainer.defaultProps = {
  filter: "",
};

export default QuizListContainer;
