import React from "react";
import PropTypes from "prop-types";

import GameMapQuiz from "../../components/GameMapQuiz";
import useQuiz from "../../hooks/UseQuiz";
import useMapping from "../../hooks/UseMapping";

import { getMapById } from "../../helpers/quizzes";

const GameMapQuizContainer = ({ quizId }) => {
  const { quiz, loading: quizLoading } = useQuiz(quizId);
  const { mapping, loading: mappingLoading } = useMapping(quizId);

  if (quizLoading || mappingLoading) {
    return null;
  }

  return (
    <GameMapQuiz quiz={quiz} map={getMapById(quizId)} submissions={mapping} />
  );
};

GameMapQuizContainer.propTypes = {
  quizId: PropTypes.number,
};

export default GameMapQuizContainer;
