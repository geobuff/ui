import React, { FC } from "react";
import {
  Divider,
  Flex,
  FlexProps,
  Text,
  TextProps,
  useBreakpointValue,
} from "@chakra-ui/react";

const HeaderText: FC<TextProps> = ({ children, ...props }) => (
  <Text
    color="white"
    fontSize={{ base: "sm", md: "lg" }}
    fontWeight="bold"
    {...props}
  >
    {children}
  </Text>
);

const GameDailyTriviaHeader: FC<FlexProps> = ({ ...props }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile === undefined) return null;

  return (
    <Flex direction="column" {...props}>
      <Flex justifyContent="space-between">
        <HeaderText>{"Daily Trivia - 24th December"}</HeaderText>
        <HeaderText>{`${!isMobile ? "Question" : ""} 1 of 10`}</HeaderText>
      </Flex>

      <Divider borderColor="white" opacity={1} borderWidth={1} marginY={3} />
    </Flex>
  );
};

export default GameDailyTriviaHeader;
