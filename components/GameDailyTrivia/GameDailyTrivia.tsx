import React, { FC, useState } from "react";
import {
  Button,
  Fade,
  Flex,
  Heading,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";

import GameDailyTriviaHeader from "./GameDailyTriviaHeader";
import GameTriviaButton from "../GameTriviaButton";
import GameDailyTriviaContent from "./GameDailyTriviaContent";

import { NewZealandRegions } from "@geobuff/svg-maps";
import ArrowRight from "../../Icons/ArrowRight";
import { getRandomCollectionItem } from "../../helpers/random";

export interface Props {}

const answers = [
  {
    text: "Peru",
    flagCode: "pe",
    isCorrect: false,
  },
  {
    text: "United Arab Emirates",
    flagCode: "ae",
    isCorrect: false,
  },
  {
    text: "Jordan",
    flagCode: "jp",
    isCorrect: true,
  },
  {
    text: "Jeff Bezos",
    flagCode: "us",
    isCorrect: false,
  },
];

const trueFalseAnswers = [
  {
    text: "True",
  },
  {
    text: "False",
  },
];

const questions = [
  {
    id: 1,
    type: "text",
    question:
      "If I’m visiting the ancient city of Petra, which country am I in?",
    answers,
  },
  {
    id: 2,
    type: "flag",
    question: "What country does this flag belong to?",
    flagCode: "nz",
    answers,
  },
  {
    id: 3,
    type: "map",
    question: "What Country is this?",
    map: NewZealandRegions,
    answers,
  },
  {
    id: 4,
    type: "text",
    question: "Is Australia Real?",
    answers: trueFalseAnswers,
  },
];

const getTriviaButtonStatus = (selectedAnswer, answer: any) => {
  if (selectedAnswer.text !== answer.text) {
    return answer.isCorrect ? "outlined" : "idle";
  }

  return selectedAnswer.isCorrect ? "correct" : "incorrect";
};

const GameDailyTrivia: FC<Props> = () => {
  const [remainingQuestions, setRemainingQuestions] = useState(questions);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (answer: any) => {
    answer.isCorrect ? console.log("correct!") : console.log("nope!!! >:(");

    setSelectedAnswer(answer);
    setHasAnswered(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);

    const updatedRemainingQuestions = remainingQuestions.filter(
      (question) => question.id !== currentQuestion.id
    );

    const nextQuestion = getRandomCollectionItem(updatedRemainingQuestions);

    setRemainingQuestions(updatedRemainingQuestions);
    setCurrentQuestion(nextQuestion);
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
        type={currentQuestion.type as any}
        text={currentQuestion.question}
      />

      <Flex direction="column" marginTop="auto" width="100%">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {currentQuestion.answers.map((answer) => (
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
