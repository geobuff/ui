import React, { FC, useState } from "react";
import Head from "next/head";
import { Flex, useBreakpointValue } from "@chakra-ui/react";

import MainView from "../MainView";

import GameDailyTriviaHeader from "./GameDailyTriviaHeader";
import GameDailyTriviaContent from "./GameDailyTriviaContent";
import GameDailyTriviaAnswers from "./GameDailyTriviaAnswers";

import { getRandomCollectionItem } from "../../helpers/random";

import { DailyTriviaQuestion } from "../../types/daily-trivia-questions";
import { DailyTriviaAnswer } from "../../types/daily-trivia-answer";
import { DailyTrivia } from "../../types/daily-trivia";

export interface Props {
  trivia: DailyTrivia;
}

const GameDailyTrivia: FC<Props> = ({ trivia }) => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [remainingQuestions, setRemainingQuestions] = useState(
    trivia.questions
  );
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<DailyTriviaAnswer>();

  const [question, setQuestion] = useState<DailyTriviaQuestion>(
    getRandomCollectionItem(trivia.questions)
  );
  const [questionNumber, setQuestionNumber] = useState(1);

  const handleAnswer = (answer: DailyTriviaAnswer): void => {
    answer.isCorrect && setScore(score + 1);
    setSelectedAnswer(answer);
    setHasAnswered(true);
  };

  const handleNextQuestion = (): void => {
    setSelectedAnswer(null);
    setHasAnswered(false);

    const updatedRemainingQuestions = remainingQuestions.filter(
      (x) => x.id !== question.id
    );

    const nextQuestion = getRandomCollectionItem(updatedRemainingQuestions);

    setRemainingQuestions(updatedRemainingQuestions);
    setQuestion(nextQuestion);
    setQuestionNumber(questionNumber + 1);
  };

  const isLastQuestion = remainingQuestions.length === 1;
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

          <GameDailyTriviaContent
            text={question?.question}
            type={question?.type}
            map={question?.map}
            highlighted={question?.highlighted}
            flagCode={question?.flagCode}
            imageUrl={question?.imageUrl}
          />

          {/* <GameDailyTriviaGameOver /> */}

          <GameDailyTriviaAnswers
            question={question}
            hasAnswered={hasAnswered}
            selectedAnswer={selectedAnswer}
            isLastQuestion={isLastQuestion}
            onHandleAnswer={handleAnswer}
            onHandleNextQuestion={handleNextQuestion}
          />
        </Flex>
      </MainView>
    </>
  );
};

export default GameDailyTrivia;
