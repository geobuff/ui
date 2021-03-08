import React from "react";
import PropTypes from "prop-types";

import GameMapQuiz from "../../components/GameMapQuiz";

import useQuiz from "../../hooks/UseQuiz";
import { getMapById } from "../../helpers/quizzes";
import { flattenCountries } from "../../helpers/game";

const GameMapQuizContainer = ({ id }) => {
  const { quiz, loading: loadingQuiz, data } = useQuiz(id);

  const submissions = flattenCountries(data);

  if (loadingQuiz) {
    return null;
  }

  return (
    <GameMapQuiz quiz={quiz} map={getMapById(id)} submissions={submissions} />
  );
};

GameMapQuizContainer.propTypes = {
  id: PropTypes.number,
};

export default GameMapQuizContainer;
