import React, { FC, useContext, useMemo } from "react";

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

import { LanguageContext } from "../../../contexts/LanguageContext";

import { useScoreResponses } from "../../../hooks/UseScoreResponses";

export interface Props {
  score: number;
  maxQuestionNumber: number;
  onCopyScore: () => void;
  onPlayAgain: () => void;
}

const GameCommunityQuizGameOver: FC<Props> = ({
  score = 0,
  maxQuestionNumber = 10,
  onCopyScore = () => {},
  onPlayAgain = () => {},
}) => {
  const { t } = useContext(LanguageContext);

  const { getScoreResponse } = useScoreResponses();

  // useMemo prevents getScoreSubtitle from
  // getting different values on each render
  const scoreSubtitle = useMemo(
    () => getScoreResponse(score, maxQuestionNumber),
    [score, maxQuestionNumber, getScoreResponse]
  );

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
          {t.global.gameOver}
        </Heading>

        <Box marginY={16}>
          <Text
            fontSize={{ base: "42px", md: "64px" }}
            fontWeight="extrabold"
            letterSpacing="3px"
          >
            {`${score}/${maxQuestionNumber}`}
          </Text>
          <Text
            fontSize={{ base: "24px", md: "32px" }}
            fontWeight="medium"
            color="#9FC7D9"
          >
            {scoreSubtitle}
          </Text>
        </Box>

        <Button
          colorScheme="gray"
          paddingY={8}
          paddingX={6}
          marginBottom={3}
          borderRadius={12}
          size="lg"
          fontWeight="bold"
          color="black"
          maxWidth={420}
          marginX="auto"
          width="full"
          onClick={onCopyScore}
        >
          {t.global.copyScore}
        </Button>

        <Button
          colorScheme="green"
          paddingY={8}
          paddingX={6}
          borderRadius={12}
          size="lg"
          fontWeight="bold"
          maxWidth={420}
          marginX="auto"
          width="full"
          onClick={onPlayAgain}
        >
          {t.global.playAgain}
        </Button>
      </Flex>
    </Flex>
  );
};

export default GameCommunityQuizGameOver;
