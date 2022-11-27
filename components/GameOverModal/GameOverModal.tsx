import React, { FC, useContext } from "react";

import { Box, Button, Divider, Flex, Text, Tooltip } from "@chakra-ui/react";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import ArrowLeft from "../../Icons/ArrowLeft";
import SolidQuestionMarkCircle from "../../Icons/SolidQuestionMarkCircle";
import { secondsToMinutesString } from "../../helpers/time";
import { LeaderboardEntry } from "../../types/leaderboard-entry";
import Modal from "../Modal";
import GameOverModalExplainerText from "./GameOverModalExplainerText";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={6} />;

export interface Props {
  quizName?: string;
  maxScore?: number;
  score?: number;
  time?: number;
  existingEntry?: LeaderboardEntry;
  isLoggedIn?: boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  isSubmitting?: boolean;
  isNotchedIphone?: boolean;
  onClose?: () => void;
  onSubmit?: (existingEntry: LeaderboardEntry) => void;
  onRedirectWithScore?: (path: string) => void;
}

const GameOverModal: FC<Props> = ({
  quizName = "",
  maxScore = 0,
  score = 0,
  time = 100,
  isLoggedIn = true,
  isLoading = true,
  existingEntry = null,
  isOpen = false,
  isSubmitting = false,
  isNotchedIphone = false,
  onClose = (): void => {},
  onSubmit = (existingEntry: LeaderboardEntry): void => {},
  onRedirectWithScore = (path: string): void => {},
}) => {
  const { t } = useContext(LanguageContext);

  const footer = onSubmit ? (
    <Button
      colorScheme="green"
      onClick={(): void => onSubmit(existingEntry)}
      isDisabled={!isLoggedIn || isSubmitting || isLoading}
      marginBottom={isNotchedIphone ? 4 : 0}
    >
      {t.global.submit}
    </Button>
  ) : (
    <Box height="30px" />
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} footer={footer}>
      <Button
        alignItems="center"
        backgroundColor="transparent"
        marginTop={2}
        marginLeft={2}
        _hover={{
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        <ArrowLeft height={5} width={5} marginRight={1} />
        <Text fontWeight="bold" fontSize="14px">
          {t.gameOverModal.backToMapText}
        </Text>
        <Tooltip padding={2} label={t.gameOverModal.backToMapExplainer}>
          <Text>
            <SolidQuestionMarkCircle
              height={3}
              width={3}
              marginLeft={1}
              marginBottom="2px"
              color="gray.600"
            />
          </Text>
        </Tooltip>
      </Button>

      <Box padding={{ base: 4, md: 8 }}>
        <Box textAlign="center">
          <Text fontSize="46px" fontWeight="black">
            {t.global.gameOver}
          </Text>

          <Text color="#828282" fontSize="22px" fontWeight="bold">
            {quizName}
          </Text>
        </Box>

        {divider}

        <Flex marginY={4} marginX={2} justifyContent="space-between">
          <Box>
            <Text fontSize="16px" fontWeight="bold">
              {t.global.score.toUpperCase()}
            </Text>
            <Flex alignItems="flex-end">
              <Text
                fontSize="46px"
                fontWeight="black"
                lineHeight="40px"
                marginRight={1}
                marginY={2}
              >
                {score}
              </Text>
              <Text
                color="#768389"
                fontSize="26px"
                fontWeight="bold"
                lineHeight="40px"
                marginBottom={1}
              >
                {`/ ${maxScore}`}
              </Text>
            </Flex>
          </Box>
          <Box>
            <Text fontSize="16px" fontWeight="bold">
              {t.global.time.toUpperCase()}
            </Text>
            <Text
              fontSize="46px"
              fontWeight="black"
              lineHeight="40px"
              marginY={2}
            >
              {secondsToMinutesString(time)}
            </Text>
          </Box>
        </Flex>

        {divider}

        <Box marginTop={8}>
          <GameOverModalExplainerText
            existingEntry={existingEntry}
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            onSubmit={onSubmit}
            onRedirectWithScore={onRedirectWithScore}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default GameOverModal;
