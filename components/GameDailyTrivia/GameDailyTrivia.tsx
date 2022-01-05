import React, { FC, useState } from "react";
import {
  Button,
  Fade,
  Flex,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";

import GameDailyTriviaHeader from "./GameDailyTriviaHeader";
import GameTriviaButton from "../GameTriviaButton";
import GameDailyTriviaContent from "./GameDailyTriviaContent";

import ArrowRight from "../../Icons/ArrowRight";
import { DailyTriviaQuestion } from "../../types/daily-trivia-questions";
import { DailyTriviaAnswer } from "../../types/daily-trivia-answer";
import { DailyTrivia } from "../../types/daily-trivia";
import MainView from "../MainView";
import Head from "next/head";

export interface Props {
  trivia: DailyTrivia;
}

const getTriviaButtonStatus = (selectedAnswer, answer: any) => {
  if (selectedAnswer.text !== answer.text) {
    return answer.isCorrect ? "outlined" : "idle";
  }

  return selectedAnswer.isCorrect ? "correct" : "incorrect";
};

const GameDailyTrivia: FC<Props> = ({ trivia }) => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<DailyTriviaAnswer>();
  const [question, setQuestion] = useState<DailyTriviaQuestion>(
    trivia.questions[0]
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
    setQuestion(trivia.questions[questionNumber]);
    setQuestionNumber(questionNumber + 1);
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

          <GameDailyTriviaContent
            text={question?.question}
            type={question?.type}
            map={question?.map}
            highlighted={question?.highlighted}
            flagCode={question?.flagCode}
            imageUrl={question?.imageUrl}
          />

          <Flex direction="column" marginTop="auto" width="100%">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {question?.answers?.map((answer) => (
                <GameTriviaButton
                  // TODO: move to function
                  status={
                    (hasAnswered &&
                      getTriviaButtonStatus(selectedAnswer, answer)) ||
                    "idle"
                  }
                  key={answer?.text}
                  text={answer.text}
                  flagCode={answer?.flagCode}
                  onClick={() => handleAnswer(answer)}
                  isDisabled={hasAnswered}
                  _disabled={{ opacity: "1", cursor: "not-allowed" }}
                />
              ))}
            </SimpleGrid>
            <Flex justifyContent="flex-end">
              <Fade in={hasAnswered}>
                <Button
                  marginY={5}
                  onClick={handleNextQuestion}
                  variant="ghost"
                  color="white"
                  rightIcon={<ArrowRight strokeWidth={"20px"} />}
                  iconSpacing={1}
                  _hover={{
                    backgroundColor: "#236175",
                    transform: "scale(1.05)",
                  }}
                >
                  {isLastQuestion ? "Finish" : "Next Question"}
                </Button>
              </Fade>
            </Flex>
          </Flex>
        </Flex>
      </MainView>
    </>
  );
};

export default GameDailyTrivia;
