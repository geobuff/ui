import React from "react";
import PropTypes from "prop-types";

import GameFlagQuiz from "../../components/GameFlagQuiz";
import useQuiz from "../../hooks/UseQuiz";
import useMapping from "../../hooks/UseMapping";
import GameSpinner from "../../components/GameSpinner";
import { FlagGameContextProvider } from "../../context/FlagGameContext";

const GameFlagQuizContainer = ({ quizId }) => {
  const { quiz, isLoading: isLoadingQuiz } = useQuiz(quizId);
  const { mapping, isLoading: isLoadingMapping } = useMapping(quizId);

  if (isLoadingQuiz || isLoadingMapping) {
    return <GameSpinner />;
  }

  return (
    <FlagGameContextProvider>
      <GameFlagQuiz quiz={quiz} mapping={mapping} />
    </FlagGameContextProvider>
  );
};

GameFlagQuizContainer.propTypes = {
  quizId: PropTypes.number,
};

export default GameFlagQuizContainer;
