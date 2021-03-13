import React from "react";
import PropTypes from "prop-types";
import QuizList from "../../components/QuizList";
import useQuizzes from "../../hooks/UseQuizzes";

const QuizListContainer = ({ filter }) => {
  const { quizzes, isLoading } = useQuizzes(filter);

  if (isLoading) {
    return null;
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
