import React, { FC } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

// export interface Props {}

const GameDailyTriviaGameOver: FC = () => {
  return (
    <Flex
      flex={1}
      direction="column"
      justifyContent="center"
      alignItems="center"
      color="white"
    >
      <Box textAlign="center">
        <Heading fontSize="72px" fontWeight="extrabold">
          {"GAME OVER"}
        </Heading>

        <Box marginY={10}>
          <Text fontSize="64px" fontWeight="bold" letterSpacing="2px">
            {"6/10"}
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
        >
          {"Play Again"}
        </Button>
      </Box>
    </Flex>
  );
};

export default GameDailyTriviaGameOver;
