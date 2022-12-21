import React, { FC } from "react";

import { Box } from "@chakra-ui/react";

import GameFlagQuizContainer from "../../containers/GameFlagQuizContainer";

import { MappingEntry } from "../../types/mapping-entry";
import { QuizDto } from "../../types/quiz-dto";
import { QuizTypes } from "../../types/quiz-types";
import GameMapQuiz from "../GameMapQuiz";

interface Props {
  quiz: QuizDto;
  mapping: MappingEntry[];
}

export const GameQuiz: FC<Props> = ({ quiz, mapping }) =>
  quiz.typeId === QuizTypes.MAP ? (
    <GameMapQuiz
      time={quiz?.time}
      name={quiz?.name}
      typeId={quiz?.typeId}
      maxScore={quiz?.maxScore}
      plural={quiz?.plural}
      route={quiz?.route}
      id={quiz?.id}
      mapping={mapping}
      map={quiz?.map}
      mapClassName={quiz?.mapName}
      hasLeaderboard={quiz?.hasLeaderboard}
      hasFlags={quiz?.hasFlags}
      hasGrouping={quiz?.hasGrouping}
    />
  ) : (
    <GameFlagQuizContainer quiz={quiz} mapping={mapping} />
  );
