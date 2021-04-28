import React from "react";
import PropTypes from "prop-types";

import GameFlagQuiz from "../../components/GameFlagQuiz";
import useQuiz from "../../hooks/UseQuiz";
import useMapping from "../../hooks/UseMapping";

const GameFlagQuizContainer = ({ quizId }) => {
  const { quiz, isLoading: isLoadingQuiz } = useQuiz(quizId);
  const { mapping, isLoading: isLoadingMapping } = useMapping(quizId);

  if (isLoadingQuiz || isLoadingMapping) {
    return null;
  }

  return <GameFlagQuiz quiz={quiz} mapping={mapping} />;
};

GameFlagQuizContainer.propTypes = {
  quizId: PropTypes.number,
};

export default GameFlagQuizContainer;
