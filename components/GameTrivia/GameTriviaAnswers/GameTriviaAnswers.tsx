import React, { FC, useContext } from "react";

import { ArrowRight } from "@geobuff/buff-ui/components";

import { Button, Fade, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { use100vh } from "react-div-100vh";

import { LanguageContext } from "../../../contexts/LanguageContext";

import { TriviaAnswer } from "../../../types/trivia-answer";
import { TriviaQuestion } from "../../../types/trivia-question";
import GameTriviaButton from "../GameTriviaButton";

export interface Props {
  question: TriviaQuestion;
  selectedAnswer: TriviaAnswer;
  hasAnswered: boolean;
  isLastQuestion: boolean;
  isNotchedIphone?: boolean;
  onAnswerQuestion: (answer: TriviaAnswer) => void;
  onNextQuestion: () => void;
  onGameStop: () => void;
}

const getTriviaButtonStatus = (
  selectedAnswer: TriviaAnswer,
  answer: TriviaAnswer
) => {
  if (selectedAnswer.text !== answer.text) {
    return answer.isCorrect ? "outlined" : "idle";
  }

  return selectedAnswer.isCorrect ? "correct" : "incorrect";
};

const GameTriviaAnswers: FC<Props> = ({
  question,
  hasAnswered = false,
  selectedAnswer,
  isLastQuestion = false,
  isNotchedIphone = false,
  onAnswerQuestion = () => {},
  onNextQuestion = () => {},
  onGameStop = () => {},
}) => {
  const { t } = useContext(LanguageContext);

  const height = use100vh();
  const isTinyMobile = height < 625;

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
            text={answer?.text}
            flagCode={answer?.flagCode}
            flagUrl={answer?.flagUrl.Valid ? answer.flagUrl.String : ""}
            isCondensed={isTinyMobile}
            onClick={() => onAnswerQuestion(answer)}
            isDisabled={hasAnswered}
            _disabled={{ opacity: "1", cursor: "not-allowed" }}
          />
        ))}
      </SimpleGrid>

      {hasAnswered && question?.explainer && (
        <Flex my={6} color="white" fontSize={{ base: "sm", md: "lg" }}>
          <Text>{question?.explainer}</Text>
        </Flex>
      )}

      <Flex
        justifyContent="flex-end"
        marginTop={{ base: -2, md: 0 }}
        height={{ base: "52px", md: "60px" }}
        marginBottom={isNotchedIphone ? 5 : 0}
      >
        <Fade in={hasAnswered} unmountOnExit>
          <Button
            variant="ghost"
            color="white"
            fontSize={{ base: "sm", md: "md" }}
            marginTop={5}
            paddingY={2}
            height={isTinyMobile ? "32px" : "40px"}
            marginRight={{ base: 0, md: 1 }}
            rightIcon={<ArrowRight strokeWidth={"20px"} />}
            iconSpacing={1}
            onClick={isLastQuestion ? onGameStop : onNextQuestion}
            _hover={{
              backgroundColor: "#236175",
              transform: "scale(1.05)",
            }}
          >
            {isLastQuestion ? t.global.finish : t.global.nextQuestion}
          </Button>
        </Fade>
      </Flex>
    </Flex>
  );
};

export default GameTriviaAnswers;
