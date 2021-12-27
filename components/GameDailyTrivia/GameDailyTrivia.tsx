import React, { FC, useState } from "react";
import {
  Flex,
  Heading,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";

import GameDailyTriviaHeader from "./GameDailyTriviaHeader";
import GameTriviaButton from "../GameTriviaButton";
import GameDailyTriviaContent from "./GameDailyTriviaContent";

import { NewZealandRegions } from "@geobuff/svg-maps";

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

const questions = [
  {
    type: "text",
    question:
      "If I’m visiting the ancient city of Petra, which country am I in?",
    answers,
  },
  {
    type: "flag",
    question: "What country does this flag belong to?",
    flagCode: "nz",
    answers,
  },
  {
    type: "map",
    question: "What Country is this?",
    map: NewZealandRegions,
    answers,
  },
  {
    type: "text",
    question:
      "If I’m visiting the ancient city of Petra, which country am I in?",
    answers,
  },
];

const GameDailyTrivia: FC<Props> = () => {
  // const [remainingQuestions, setRemainingQuestions] = useState(questions);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [questionNumber, setQuestionNumber] = useState(1);

  console.log(questionNumber, "questionNumber");

  const handleAnswer = (isCorrect: boolean) => {
    isCorrect ? console.log("correct!") : console.log("nope!!! >:(");

    setCurrentQuestion(questions[1]);
    setQuestionNumber(2);
  };

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

      <Flex
        direction="column"
        marginTop="auto"
        marginBottom={{ base: 0, md: 4 }}
        width="100%"
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {currentQuestion.answers.map((answer) => (
            <GameTriviaButton
              key={answer?.text}
              text={answer.text}
              flagCode={answer?.flagCode}
              onClick={() => handleAnswer(answer.isCorrect)}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default GameDailyTrivia;
