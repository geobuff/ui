import React, { FC } from "react";

import { isMobile } from "react-device-detect";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import { FlagGameContextProvider } from "../../contexts/FlagGameContext";

import GameFlagQuiz from "../../components/GameFlagQuiz";

import { MappingEntry } from "../../types/mapping-entry";
import { QuizDto } from "../../types/quiz-dto";

interface Props {
  quiz: QuizDto;
  mapping: MappingEntry[];
}

const GameFlagQuizContainer: FC<Props> = ({ quiz, mapping }) => {
  return (
    <DndProvider
      backend={isMobile ? TouchBackend : HTML5Backend}
      options={{ delayTouchStart: 5, ignoreContextMenu: true }}
    >
      <FlagGameContextProvider>
        <GameFlagQuiz
          id={quiz.id}
          time={quiz.time}
          name={quiz.name}
          typeId={quiz.typeId}
          maxScore={quiz.maxScore}
          plural={quiz.plural}
          route={quiz.route}
          hasLeaderboard={quiz.hasLeaderboard}
          hasFlags={quiz.hasFlags}
          hasGrouping={quiz.hasGrouping}
          mapping={mapping}
        />
      </FlagGameContextProvider>
    </DndProvider>
  );
};

export default GameFlagQuizContainer;
