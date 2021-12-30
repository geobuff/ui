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
import { getRandomCollectionItem } from "../../helpers/random";
import { DailyTriviaQuestion } from "../../types/daily-trivia-questions";
import { DailyTriviaAnswer } from "../../types/daily-trivia-answer";

export interface Props {
  questions: DailyTriviaQuestion[];
}

const getTriviaButtonStatus = (selectedAnswer, answer: any) => {
  if (selectedAnswer.text !== answer.text) {
    return answer.isCorrect ? "outlined" : "idle";
  }

  return selectedAnswer.isCorrect ? "correct" : "incorrect";
};

const GameDailyTrivia: FC<Props> = ({ questions }) => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [remainingQuestions, setRemainingQuestions] = useState(questions);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<DailyTriviaAnswer>();
  const [question, setQuestion] = useState<DailyTriviaQuestion>(
    getRandomCollectionItem(questions)
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
        questionNumber={questionNumber}
        maxQuestionNumber={10}
        marginY={4}
      />

      <GameDailyTriviaContent
        text={question?.question}
        type={question?.type}
        map={question?.map}
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
              _hover={{ backgroundColor: "#236175", transform: "scale(1.05)" }}
            >
              {isLastQuestion ? "Finish" : "Next Question"}
            </Button>
          </Fade>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GameDailyTrivia;
