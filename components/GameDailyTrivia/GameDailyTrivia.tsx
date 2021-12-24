import React, { FC } from "react";
import {
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import GameDailyTriviaHeader from "./GameDailyTriviaHeader";

const QuizButton: FC = ({ children }) => (
  <Button
    padding={8}
    backgroundColor="#236175"
    color="white"
    size="lg"
    _hover={{
      backgroundColor: "#1d5061",
    }}
  >
    {children}
  </Button>
);

export interface Props {}

const GameDailyTrivia: FC<Props> = () => {
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
      <GameDailyTriviaHeader marginY={4} />

      <Heading color="white">
        {"If I’m visiting the ancient city of Petra, which country am I in?"}
      </Heading>
      <Flex width="100%" direction="column" marginTop="auto" marginBottom={12}>
        <SimpleGrid columns={2} spacing={4}>
          <QuizButton>{"Peru"}</QuizButton>
          <QuizButton>{"New Zealand"}</QuizButton>
          <QuizButton>{"Jordan"}</QuizButton>
          <QuizButton>{"United Arab Emirates"}</QuizButton>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default GameDailyTrivia;
