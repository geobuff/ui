import React, { FC, useContext, useState } from "react";
import Head from "next/head";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { use100vh } from "react-div-100vh";

import MainView from "../MainView";

import { AppContext } from "../../context/AppContext";
import {
  GetCommunityQuiz,
  GetCommunityQuizAnswer,
} from "../../types/get-community-quiz-dto";
import GameCommunityQuizHeader from "./GameCommunityQuizHeader";
import GameCommunityQuizGameOver from "./GameCommunityQuizGameOver";
import GameCommunityQuizContent from "./GameCommunityQuizContent";
import GameCommunityQuizAnswers from "./GameCommunityQuizAnswers";

export interface Props {
  quiz: GetCommunityQuiz;
  onIncrementPlays?: (quizId: number) => void;
}

const GameCommunityQuiz: FC<Props> = ({
  quiz,
  onIncrementPlays = (): void => {},
}) => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<
    GetCommunityQuizAnswer
  >();
  const [question, setQuestion] = useState(quiz.questions[0]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [hasGameStopped, setHasGameStopped] = useState(false);

  const { isNotchedIphone } = useContext(AppContext);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const height = use100vh();

  const isLastQuestion = questionNumber === quiz.questions.length;
  const isTinyMobile = height < 625;

  const handleAnswerQuestion = (answer: GetCommunityQuizAnswer): void => {
    answer.isCorrect && setScore(score + 1);
    setSelectedAnswer(answer);
    setHasAnswered(true);
  };

  const handleNextQuestion = (): void => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setQuestion(quiz.questions[questionNumber]);
    setQuestionNumber(questionNumber + 1);
  };

  const handleGameStop = () => {
    onIncrementPlays(quiz.id);
    setHasGameStopped(true);
  };

  const handlePlayAgain = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setQuestion(quiz.questions[0]);
    setQuestionNumber(1);
    setScore(0);
    setHasGameStopped(false);
  };

  if (isMobile === undefined) return null;

  return (
    <>
      <Head>
        <title> {`${quiz.name} - GeoBuff`}</title>
        <meta
          name="description"
          content={`${quiz.name} - ${quiz.description}`}
        />
      </Head>
      <MainView hasFooter={false} backgroundColor="#276F86">
        <Box position="fixed" top="56px" left={0} right={0} bottom={0}>
          <Flex
            flex={1}
            direction="column"
            height="100%"
            width="100%"
            maxWidth={1300}
            padding={isTinyMobile ? 4 : 5}
            marginLeft="auto"
            marginRight="auto"
          >
            <GameCommunityQuizHeader
              name={quiz.name}
              questionNumber={questionNumber}
              maxQuestionNumber={quiz.questions?.length}
            />

            {hasGameStopped ? (
              <GameCommunityQuizGameOver
                score={score}
                maxQuestionNumber={quiz.questions?.length}
                onPlayAgain={handlePlayAgain}
              />
            ) : (
              <>
                <GameCommunityQuizContent
                  text={question?.question}
                  type={question?.type}
                  map={question?.map}
                  highlighted={question?.highlighted}
                  flagCode={question?.flagCode}
                  imageUrl={question?.imageUrl}
                />
                <GameCommunityQuizAnswers
                  question={question}
                  hasAnswered={hasAnswered}
                  selectedAnswer={selectedAnswer}
                  isLastQuestion={isLastQuestion}
                  isNotchedIphone={isNotchedIphone}
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

export default GameCommunityQuiz;
