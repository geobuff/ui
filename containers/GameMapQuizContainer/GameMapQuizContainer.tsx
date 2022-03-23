import React, { FC } from "react";
import * as Maps from "@geobuff/svg-maps";

import GameMapQuiz from "../../components/GameMapQuiz";
import GameSpinner from "../../components/GameSpinner";
import useQuiz from "../../hooks/UseQuiz";
import useMapping from "../../hooks/UseMapping";

interface Props {
  quizId: number;
}

/**
 * @deprecated this component is no longer used, but we
 * should keep as it could be used somewhere else in future
 */
const GameMapQuizContainer: FC<Props> = ({ quizId }) => {
  const { quiz, isLoading: isLoadingQuiz } = useQuiz(quizId);
  const { mapping, isLoading: isLoadingMapping } = useMapping(quizId);

  if (isLoadingQuiz || isLoadingMapping) {
    return <GameSpinner />;
  }

  return (
    <GameMapQuiz
      time={quiz.time}
      name={quiz.name}
      typeId={quiz.typeId}
      maxScore={quiz.maxScore}
      plural={quiz.plural}
      route={quiz.route}
      id={quiz.id}
      hasLeaderboard={quiz.hasLeaderboard}
      hasFlags={quiz.hasFlags}
      hasGrouping={quiz.hasGrouping}
      mapping={mapping}
      map={Maps[quiz.mapSVG]}
    />
  );
};

export default GameMapQuizContainer;
