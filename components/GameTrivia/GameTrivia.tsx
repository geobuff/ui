import React, { FC, useState } from "react";
import Head from "next/head";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";

import MainView from "../MainView";

import GameTriviaHeader from "./GameTriviaHeader";
import GameTriviaContent from "./GameTriviaContent";
import GameTriviaAnswers from "./GameTriviaAnswers";
import GameTriviaGameOver from "./GameTriviaGameOver";

import { TriviaQuestion } from "../../types/trivia-questions";
import { TriviaAnswer } from "../../types/trivia-answer";
import { Trivia } from "../../types/trivia";

export interface Props {
  trivia: Trivia;
  onIncrementPlays?: (triviaId: number) => void;
}

const GameTrivia: FC<Props> = ({
  trivia,
  onIncrementPlays = (): void => {},
}) => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<TriviaAnswer>();
  const [question, setQuestion] = useState<TriviaQuestion>(trivia.questions[0]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [hasGameStopped, setHasGameStopped] = useState(false);

  const handleAnswerQuestion = (answer: TriviaAnswer): void => {
    answer.isCorrect && setScore(score + 1);
    setSelectedAnswer(answer);
    setHasAnswered(true);
  };

  const handleNextQuestion = (): void => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setQuestion(trivia.questions[questionNumber]);
    setQuestionNumber(questionNumber + 1);
  };

  const handleGameStop = () => {
    onIncrementPlays(trivia.id);
    setHasGameStopped(true);
  };

  const handlePlayAgain = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setQuestion(trivia.questions[0]);
    setQuestionNumber(1);
    setScore(0);
    setHasGameStopped(false);
  };

  const isLastQuestion = questionNumber === trivia.questions.length;
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile === undefined) return null;

  return (
    <>
      <Head>
        <title> {`${trivia.name} - GeoBuff`}</title>
      </Head>
      <MainView hasFooter={false} backgroundColor="#276F86">
        <Box position="fixed" top="56px" left={0} right={0} bottom={0}>
          <Flex
            flex={1}
            direction="column"
            height="100%"
            width="100%"
            maxWidth={1300}
            padding={5}
            marginLeft="auto"
            marginRight="auto"
          >
            <GameTriviaHeader
              name={trivia.name}
              questionNumber={questionNumber}
              maxQuestionNumber={10}
            />

            {hasGameStopped ? (
              <GameTriviaGameOver
                score={score}
                maxQuestionNumber={trivia.questions?.length}
                onPlayAgain={handlePlayAgain}
              />
            ) : (
              <>
                <GameTriviaContent
                  text={question?.question}
                  type={question?.type}
                  map={question?.map}
                  highlighted={question?.highlighted}
                  flagCode={question?.flagCode}
                  imageUrl={question?.imageUrl}
                />
                <GameTriviaAnswers
                  question={question}
                  hasAnswered={hasAnswered}
                  selectedAnswer={selectedAnswer}
                  isLastQuestion={isLastQuestion}
                  onAnswerQuestion={handleAnswerQuestion}
                  onNextQuestion={handleNextQuestion}
                  onGameStop={handleGameStop}
                />
              </>
            )}
          </Flex>
        </Box>
      </MainView>
    </>
  );
};

export default GameTrivia;