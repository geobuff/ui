import React, { FC, useContext, useState } from "react";
import Head from "next/head";
import { Box, Flex, useBreakpointValue, useToast } from "@chakra-ui/react";
import { use100vh } from "react-div-100vh";
import { DateTime } from "luxon";

import MainView from "../MainView";

import GameTriviaHeader from "./GameTriviaHeader";
import GameTriviaContent from "./GameTriviaContent";
import GameTriviaAnswers from "./GameTriviaAnswers";
import GameTriviaGameOver from "./GameTriviaGameOver";

import { AppContext } from "../../context/AppContext";
import { TriviaQuestion } from "../../types/trivia-question";
import { TriviaAnswer } from "../../types/trivia-answer";
import { Trivia } from "../../types/trivia";
import { useRouter } from "next/router";
import { getTriviaScoreMessage } from "../../helpers/clipboard";
import { copyScoreToast } from "../../helpers/toasts";

export interface Props {
  trivia: Trivia;
  onIncrementPlays?: (triviaId: number) => void;
}

const GameTrivia: FC<Props> = ({
  trivia,
  onIncrementPlays = (): void => {},
}) => {
  const toast = useToast();
  const { asPath } = useRouter();

  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<TriviaAnswer>();
  const [question, setQuestion] = useState<TriviaQuestion>(trivia.questions[0]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [hasGameStopped, setHasGameStopped] = useState(false);

  const { isNotchedIphone } = useContext(AppContext);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const height = use100vh();

  const isLastQuestion = questionNumber === trivia.questions.length;
  const isTinyMobile = height < 625;

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

  const handleCopyScore = (): void => {
    const message = getTriviaScoreMessage(
      score,
      trivia.maxScore,
      DateTime.local().toFormat("MMM dd"),
      asPath
    );
    navigator.clipboard.writeText(message);
    toast(copyScoreToast());
  };

  const handlePlayAgain = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setQuestion(trivia.questions[0]);
    setQuestionNumber(1);
    setScore(0);
    setHasGameStopped(false);
  };

  if (isMobile === undefined) return null;

  return (
    <>
      <Head>
        <title> {`${trivia.name} - GeoBuff`}</title>
        <meta
          name="description"
          content="Ten questions covering everything geography - from maps and flags, to rivers and mountains, our famous daily trivia will keep you coming back every single day."
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
            <GameTriviaHeader
              name={trivia.name}
              questionNumber={questionNumber}
              maxQuestionNumber={trivia.questions?.length}
            />

            {hasGameStopped ? (
              <GameTriviaGameOver
                score={score}
                maxQuestionNumber={trivia.questions?.length}
                onCopyScore={handleCopyScore}
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
                  imageAttributeName={question?.imageAttributeName}
                  imageAttributeUrl={question?.imageAttributeUrl}
                />
                <GameTriviaAnswers
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

export default GameTrivia;
