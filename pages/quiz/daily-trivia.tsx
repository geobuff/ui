import React, { FC } from "react";
import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import MainView from "../../components/MainView";

export interface Props {}

const QuizButton: FC = ({ children }) => (
  <Button
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
      <Box width="100%" maxWidth={1300} marginLeft="auto" marginRight="auto">
        <Heading color="white">
          {"If I’m visiting the ancient city of Petra, which country am I in?"}
        </Heading>
        <SimpleGrid marginY={4} columns={2} spacing={4}>
          <QuizButton>{"Peru"}</QuizButton>
          <QuizButton>{"New Zealand"}</QuizButton>
          <QuizButton>{"Jordan"}</QuizButton>
          <QuizButton>{"United Arab Emirates"}</QuizButton>
        </SimpleGrid>
      </Box>
    </MainView>
  );
};

export default DailyTrivia;
