import React from "react";
import PropTypes from "prop-types";
import * as Maps from "@geobuff/maps";

import GameMapQuiz from "../../components/GameMapQuiz";
import useQuiz from "../../hooks/UseQuiz";
import useMapping from "../../hooks/UseMapping";

import { Fade, Flex, Spinner } from "@chakra-ui/react";

const GameMapQuizContainer = ({ quizId }) => {
  const { quiz, isLoading: isLoadingQuiz } = useQuiz(quizId);
  const { mapping, isLoading: isLoadingMapping } = useMapping(quizId);

  if (isLoadingQuiz || isLoadingMapping) {
    return (
      <Flex
        height="90vh"
        alignItems="center"
        justifyContent="center"
        color="white"
      >
        <Fade in unmountOnExit>
          <Spinner size="xl" color="#1d8db3" />
        </Fade>
      </Flex>
    );
  }

  return <GameMapQuiz quiz={quiz} mapping={mapping} map={Maps[quiz.mapSVG]} />;
};

GameMapQuizContainer.propTypes = {
  quizId: PropTypes.number,
};

export default GameMapQuizContainer;
