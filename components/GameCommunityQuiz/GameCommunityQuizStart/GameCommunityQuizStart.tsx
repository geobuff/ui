import React, { FC } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

export interface Props {
  name?: string;
  description?: string;
  onGameStart?: () => void;
}

const GameCommunityQuizStart: FC<Props> = ({
  name = "",
  description = "",
  onGameStart = (): void => {},
}) => {
  return (
    <Flex
      flex={1}
      height="100%"
      direction="column"
      justifyContent={{ base: "flex-start", md: "center" }}
      alignItems="center"
      textAlign="center"
      color="white"
      width="100%"
      marginY={{ base: 5, md: 16 }}
    >
      <Flex flex={1} direction="column" width="100%" textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: "46px", md: "72px" }}
          fontWeight="extrabold"
        >
          {name}
        </Heading>

        <Box marginY={16}>
          <Text
            fontSize={{ base: "24px", md: "32px" }}
            fontWeight="medium"
            color="#9FC7D9"
          >
            {description}
          </Text>
        </Box>

        <Button
          colorScheme="green"
          paddingY={8}
          paddingX={6}
          borderRadius={12}
          size="lg"
          fontWeight="bold"
          maxWidth={420}
          marginX="auto"
          isFullWidth
          onClick={onGameStart}
        >
          {"Start"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default GameCommunityQuizStart;
