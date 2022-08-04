import React, { FC } from "react";
import { Quiz } from "../../types/quiz";
import useMap from "../../hooks/UseMap";
import GameMapQuiz from "../../components/GameMapQuiz";
import { MappingEntry } from "../../types/mapping-entry";
import GameSpinner from "../../components/GameSpinner";

export interface Props {
  quiz: Quiz;
  mapping: MappingEntry[];
}

const GameMapQuizContainer: FC<Props> = ({ quiz, mapping }) => {
  const { data: svgMap, isLoading } = useMap(quiz.mapSVG);

  if (isLoading) {
    return <GameSpinner />;
  }

  return (
    <GameMapQuiz
      time={quiz?.time}
      name={quiz?.name}
      typeId={quiz?.typeId}
      maxScore={quiz?.maxScore}
      plural={quiz?.plural}
      route={quiz?.route}
      id={quiz?.id}
      mapping={mapping}
      map={svgMap}
      mapClassName={quiz.mapSVG}
      hasLeaderboard={quiz?.hasLeaderboard}
      hasFlags={quiz?.hasFlags}
      hasGrouping={quiz?.hasGrouping}
    />
  );
};

export default GameMapQuizContainer;
