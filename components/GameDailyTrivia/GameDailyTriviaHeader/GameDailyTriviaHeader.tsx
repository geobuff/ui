import React, { FC } from "react";
import { Divider, Flex, FlexProps, Text } from "@chakra-ui/react";

export interface Props {}

const HeaderText: FC = ({ children }) => (
  <Text color="white" fontSize="lg" fontWeight="semibold">
    {children}
  </Text>
);

const GameDailyTriviaHeader: FC<FlexProps> = ({ ...props }) => {
  return (
    <Flex direction="column" {...props}>
      <Flex justifyContent="space-between">
        <HeaderText>{"Daily Trivia - 24th December"}</HeaderText>
        <HeaderText>{"Question 1 of 10"}</HeaderText>
      </Flex>

      <Divider borderColor="white" opacity={1} borderWidth={1} marginY={3} />
    </Flex>
  );
};

export default GameDailyTriviaHeader;
