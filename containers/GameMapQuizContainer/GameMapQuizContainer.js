import React from "react";
import PropTypes from "prop-types";
import * as Maps from "@geobuff/maps";

import GameMapQuiz from "../../components/GameMapQuiz";
import useQuiz from "../../hooks/UseQuiz";
import useMapping from "../../hooks/UseMapping";

const GameMapQuizContainer = ({ quizId }) => {
  const { quiz, isLoading: isLoadingQuiz } = useQuiz(quizId);
  const { mapping, isLoading: isLoadingMapping } = useMapping(quizId);

  console.log();

  if (isLoadingQuiz || isLoadingMapping) {
    return null;
  }

  return <GameMapQuiz quiz={quiz} mapping={mapping} map={Maps[quiz.mapSVG]} />;
};

GameMapQuizContainer.propTypes = {
  quizId: PropTypes.number,
};

export default GameMapQuizContainer;
