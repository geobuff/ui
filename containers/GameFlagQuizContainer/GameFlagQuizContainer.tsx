import React, { FC } from "react";

import GameFlagQuiz from "../../components/GameFlagQuiz";
import useQuiz from "../../hooks/UseQuiz";
import useMapping from "../../hooks/UseMapping";
import GameSpinner from "../../components/GameSpinner";
import { FlagGameContextProvider } from "../../context/FlagGameContext";

interface Props {
  quizId: number;
}

/**
 * @deprecated this component is no longer used, but we
 * should keep as it could be used somewhere else in future
 */
const GameFlagQuizContainer: FC<Props> = ({ quizId }) => {
  const { quiz, isLoading: isLoadingQuiz } = useQuiz(quizId);
  const { mapping, isLoading: isLoadingMapping } = useMapping(quizId);

  if (isLoadingQuiz || isLoadingMapping) {
    return <GameSpinner />;
  }

  return (
    <FlagGameContextProvider>
      <GameFlagQuiz
        id={quiz.id}
        time={quiz.time}
        name={quiz.name}
        typeId={quiz.typeId}
        maxScore={quiz.maxScore}
        verb={quiz.verb}
        route={quiz.route}
        hasLeaderboard={quiz.hasLeaderboard}
        hasFlags={quiz.hasFlags}
        hasGrouping={quiz.hasGrouping}
        mapping={mapping}
      />
    </FlagGameContextProvider>
  );
};

export default GameFlagQuizContainer;
