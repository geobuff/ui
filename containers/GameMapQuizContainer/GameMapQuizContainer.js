import React from "react";
import PropTypes from "prop-types";

import GameMapQuiz from "../../components/GameMapQuiz";

import useQuiz from "../../hooks/UseQuiz";
import { getMapById } from "../../helpers/quizzes";

const GameMapQuizContainer = ({ id }) => {
  const { quiz, isLoading, data: submissions } = useQuiz(id);

  if (isLoading) {
    return null;
  }

  return (
    <GameMapQuiz
      isLoading={isLoading}
      quiz={quiz}
      map={getMapById(id)}
      submissions={submissions}
    />
  );
};

GameMapQuizContainer.propTypes = {
  id: PropTypes.number,
};

export default GameMapQuizContainer;
