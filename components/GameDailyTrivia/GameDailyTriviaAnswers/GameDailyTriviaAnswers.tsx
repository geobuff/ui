import React, { FC } from "react";
import { Box, Button, Fade, Flex, SimpleGrid } from "@chakra-ui/react";

import ArrowRight from "../../../Icons/ArrowRight";
import GameTriviaButton from "../../GameTriviaButton";

import { DailyTriviaQuestion as Question } from "../../../types/daily-trivia-questions";
import { DailyTriviaAnswer as Answer } from "../../../types/daily-trivia-answer";

export interface Props {
  question: Question;
  selectedAnswer: Answer;
  hasAnswered: boolean;
  isLastQuestion: boolean;
  onAnswerQuestion: (answer: Answer) => void;
  onNextQuestion: () => void;
  onGameStop: () => void;
}

const getTriviaButtonStatus = (selectedAnswer: Answer, answer: Answer) => {
  if (selectedAnswer.text !== answer.text) {
    return answer.isCorrect ? "outlined" : "idle";
  }

  return selectedAnswer.isCorrect ? "correct" : "incorrect";
};

const GameDailyTriviaAnswers: FC<Props> = ({
  question,
  hasAnswered = false,
  selectedAnswer,
  isLastQuestion = false,
  onAnswerQuestion = () => {},
  onNextQuestion = () => {},
  onGameStop = () => {},
}) => {
  return (
    <Flex direction="column" marginTop="auto" width="100%">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 2, md: 4 }}>
        {question?.answers?.map((answer) => (
          <GameTriviaButton
            status={
              (hasAnswered && getTriviaButtonStatus(selectedAnswer, answer)) ||
              "idle"
            }
            key={answer?.text}
            text={answer.text}
            flagCode={answer?.flagCode}
            onClick={() => onAnswerQuestion(answer)}
            isDisabled={hasAnswered}
            _disabled={{ opacity: "1", cursor: "not-allowed" }}
          />
        ))}
      </SimpleGrid>

      <Flex
        justifyContent="flex-end"
        marginTop={{ base: -2, md: 0 }}
        height={{ base: "52px", md: "60px" }}
      >
        <Fade in={hasAnswered} unmountOnExit>
          <Button
            variant="ghost"
            color="white"
            fontSize={{ base: "sm", md: "md" }}
            marginTop={5}
            marginRight={1}
            rightIcon={<ArrowRight strokeWidth={"20px"} />}
            iconSpacing={1}
            onClick={isLastQuestion ? onGameStop : onNextQuestion}
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
  );
};

export default GameDailyTriviaAnswers;
