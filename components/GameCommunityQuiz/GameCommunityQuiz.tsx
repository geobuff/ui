import React, { FC, useContext, useState } from "react";

import { Alert, AlertIcon, Box, Flex, useToast } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { use100vh } from "react-div-100vh";

import { AppContext } from "../../context/AppContext";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import { getCommunityQuizScoreMessage } from "../../helpers/clipboard";
import { genericToast } from "../../helpers/toasts";
import {
  GetCommunityQuiz,
  GetCommunityQuizAnswer,
} from "../../types/get-community-quiz-dto";
import GameCommunityQuizAnswers from "./GameCommunityQuizAnswers";
import GameCommunityQuizContent from "./GameCommunityQuizContent";
import GameCommunityQuizGameOver from "./GameCommunityQuizGameOver";
import GameCommunityQuizHeader from "./GameCommunityQuizHeader";
import GameCommunityQuizStart from "./GameCommunityQuizStart";

export interface Props {
  quiz: GetCommunityQuiz;
  error?: string;
  onIncrementPlays?: (quizId: number) => void;
}

const GameCommunityQuiz: FC<Props> = ({
  quiz,
  error = "",
  onIncrementPlays = (): void => {},
}) => {
  const { t } = useContext(LanguageContext);

  const toast = useToast();
  const { asPath } = useRouter();

  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] =
    useState<GetCommunityQuizAnswer>();
  const [question, setQuestion] = useState(quiz.questions[0]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [hasGameStopped, setHasGameStopped] = useState(false);

  const { isNotchedIphone } = useContext(AppContext);
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

  const handleGameStart = () => {
    setHasGameStarted(true);
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

  const handleCopyScore = (): void => {
    const message = getCommunityQuizScoreMessage(
      score,
      quiz.maxScore,
      quiz.name,
      asPath
    );
    navigator.clipboard.writeText(message);
    toast(genericToast(t.toasts.copyScoreTitle, t.toasts.copyScoreDescription));
  };

  if (error) {
    return (
      <Alert status="error" borderRadius={6} marginBottom={3}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  const getContent = (): JSX.Element => {
    if (!hasGameStarted) {
      return (
        <GameCommunityQuizStart
          name={quiz.name}
          description={quiz.description}
          onGameStart={handleGameStart}
        />
      );
    }

    if (hasGameStopped) {
      return (
        <GameCommunityQuizGameOver
          score={score}
          maxQuestionNumber={quiz.questions?.length}
          onCopyScore={handleCopyScore}
          onPlayAgain={handlePlayAgain}
        />
      );
    }

    return (
      <>
        <GameCommunityQuizContent
          text={question?.question}
          type={question?.type}
          map={question?.map}
          mapName={question?.mapName}
          highlighted={question?.highlighted}
          flagCode={question?.flagCode}
          flagUrl={question.flagUrl.Valid ? question.flagUrl.String : ""}
          imageUrl={question?.imageUrl}
          imageAttributeName={question?.imageAttributeName}
          imageAttributeUrl={question?.imageAttributeUrl}
          imageWidth={question?.imageWidth}
          imageHeight={question?.imageHeight}
          imageAlt={question?.imageAlt}
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
    );
  };

  return (
    <>
      <Head>
        <title> {`${quiz.name} - GeoBuff`}</title>
        <meta
          name="description"
          content={`${quiz.name} - ${quiz.description}`}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4707219290548480"
          crossOrigin="anonymous"
        />
      </Head>
      <Box
        position="fixed"
        top="56px"
        left={0}
        right={0}
        bottom={0}
        backgroundColor="#276F86"
      >
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
          {getContent()}
        </Flex>
      </Box>
    </>
  );
};

export default GameCommunityQuiz;
