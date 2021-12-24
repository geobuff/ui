import React, { FC } from "react";
import {
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import MainView from "../../components/MainView";

export interface Props {}

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

const HeaderText: FC = ({ children }) => (
  <Text color="white" fontSize="lg" fontWeight="semibold">
    {children}
  </Text>
);

const DailyTrivia: FC<Props> = () => {
  return (
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
        <Flex direction="column" marginY={6}>
          <Flex justifyContent="space-between">
            <HeaderText>{"Daily Trivia - 24th December"}</HeaderText>
            <HeaderText>{"Question 1 of 10"}</HeaderText>
          </Flex>

          <Divider
            borderColor="white"
            opacity={1}
            borderWidth={1}
            marginY={3}
          />
        </Flex>

        <Heading color="white">
          {"If I’m visiting the ancient city of Petra, which country am I in?"}
        </Heading>
        <Flex
          width="100%"
          direction="column"
          marginTop="auto"
          marginBottom={12}
        >
          <SimpleGrid columns={2} spacing={4}>
            <QuizButton>{"Peru"}</QuizButton>
            <QuizButton>{"New Zealand"}</QuizButton>
            <QuizButton>{"Jordan"}</QuizButton>
            <QuizButton>{"United Arab Emirates"}</QuizButton>
          </SimpleGrid>
        </Flex>
      </Flex>
    </MainView>
  );
};

export default DailyTrivia;
