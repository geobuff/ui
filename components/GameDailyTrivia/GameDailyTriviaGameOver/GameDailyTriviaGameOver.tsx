import React, { FC } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

export interface Props {
  score: number;
  maxQuestionNumber: number;
  onPlayAgain: () => void;
}

const GameDailyTriviaGameOver: FC<Props> = ({
  score = 0,
  maxQuestionNumber = 10,
  onPlayAgain = () => {},
}) => {
  return (
    <Flex
      flex={1}
      height="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
      color="white"
    >
      <Box textAlign="center">
        <Heading fontSize="72px" fontWeight="extrabold" marginBottom={16}>
          {"GAME OVER"}
        </Heading>

        <Box marginY={16}>
          <Text fontSize="64px" fontWeight="bold" letterSpacing="4px">
            {`${score}/${maxQuestionNumber}`}
          </Text>
          <Text fontSize="36px" fontWeight="bold">
            {"Not a bad effort!"}
          </Text>
        </Box>

        <Button
          colorScheme="green"
          marginY={6}
          paddingY={8}
          paddingX={6}
          borderRadius={12}
          size="lg"
          fontWeight="bold"
          isFullWidth
          onClick={onPlayAgain}
        >
          {"Play Again"}
        </Button>
      </Box>
    </Flex>
  );
};

export default GameDailyTriviaGameOver;
