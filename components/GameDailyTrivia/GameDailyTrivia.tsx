import React, { FC, useState } from "react";
import Head from "next/head";
import { Flex, useBreakpointValue } from "@chakra-ui/react";

import MainView from "../MainView";

import GameDailyTriviaHeader from "./GameDailyTriviaHeader";
import GameDailyTriviaContent from "./GameDailyTriviaContent";
import GameDailyTriviaAnswers from "./GameDailyTriviaAnswers";

import { DailyTriviaQuestion as Question } from "../../types/daily-trivia-questions";
import { DailyTriviaAnswer as Answer } from "../../types/daily-trivia-answer";
import { DailyTrivia } from "../../types/daily-trivia";
import GameDailyTriviaGameOver from "./GameDailyTriviaGameOver";

export interface Props {
  trivia: DailyTrivia;
}

const GameDailyTrivia: FC<Props> = ({ trivia }) => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>();
  const [question, setQuestion] = useState<Question>(trivia.questions[0]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [hasGameStopped, setHasGameStopped] = useState(false);

  const handleAnswerQuestion = (answer: Answer): void => {
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
          <GameDailyTriviaHeader
            name={trivia.name}
            questionNumber={questionNumber}
            maxQuestionNumber={10}
            marginY={4}
          />

          {hasGameStopped ? (
            <GameDailyTriviaGameOver
              score={score}
              maxQuestionNumber={trivia.questions?.length}
              onPlayAgain={handlePlayAgain}
            />
          ) : (
            <>
              <GameDailyTriviaContent
                text={question?.question}
                type={question?.type}
                map={question?.map}
                highlighted={question?.highlighted}
                flagCode={question?.flagCode}
                imageUrl={question?.imageUrl}
              />
              <GameDailyTriviaAnswers
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
      </MainView>
    </>
  );
};

export default GameDailyTrivia;
