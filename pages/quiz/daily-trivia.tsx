import React, { FC } from "react";
import { Box, Button, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import MainView from "../../components/MainView";

export interface Props {}

const QuizButton: FC = ({ children }) => (
  <Button
    textAlign="left"
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

const DailyTrivia: FC<Props> = () => {
  return (
    <MainView hasFooter={false} backgroundColor="#276F86">
      <Flex
        flex={1}
        direction="column"
        height="100%"
        width="100%"
        maxWidth={1300}
        marginLeft="auto"
        marginRight="auto"
      >
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
