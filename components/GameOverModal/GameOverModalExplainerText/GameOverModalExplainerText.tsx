import React, { FC, useContext } from "react";

import { Box, Button, Text } from "@chakra-ui/react";

import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";

import { LeaderboardEntry } from "../../../types/leaderboard-entry";
import GameExistingEntry from "../../GameExistingEntry";

interface ExplainerTextProps {
  [x: string]: any;
}

const ExplainerText: FC<ExplainerTextProps> = ({
  children = null,
  ...props
}) => (
  <Text
    color="#828282"
    fontSize="14px"
    fontWeight="medium"
    textAlign="center"
    {...props}
  >
    {children}
  </Text>
);

interface GameOverModalExplainerTextProps {
  existingEntry?: LeaderboardEntry;
  isLoggedIn?: boolean;
  isLoading?: boolean;
  onSubmit?: (existingEntry: LeaderboardEntry) => void;
  onRedirectWithScore?: (path: string) => void;
}

const GameOverModalExplainerText: FC<GameOverModalExplainerTextProps> = ({
  existingEntry = null,
  isLoggedIn = false,
  isLoading = true,
  onSubmit = (existingEntry: LeaderboardEntry): void => {},
  onRedirectWithScore = (path: string): void => {},
}) => {
  const { t } = useContext(LanguageContext);

  const scoreQuizNotLoggedIn = !onSubmit && !isLoggedIn;
  const scoreQuizLoggedIn = !onSubmit && isLoggedIn;
  const leaderboardQuizNotLoggedIn = onSubmit && !isLoggedIn;

  if (scoreQuizNotLoggedIn) {
    return (
      <ExplainerText>
        You must{" "}
        <Button
          variant="link"
          onClick={(): void => onRedirectWithScore("/login")}
          fontSize="14px"
          minWidth="0"
        >
          login
        </Button>{" "}
        or{" "}
        <Button
          variant="link"
          onClick={(): void => onRedirectWithScore("/register")}
          fontSize="14px"
          minWidth="0"
        >
          register
        </Button>{" "}
        to update your high score.
      </ExplainerText>
    );
  }

  if (leaderboardQuizNotLoggedIn) {
    return (
      <ExplainerText>
        You must{" "}
        <Button
          variant="link"
          onClick={(): void => onRedirectWithScore("/login")}
          fontSize="14px"
          minWidth="0"
        >
          login
        </Button>{" "}
        or{" "}
        <Button
          variant="link"
          onClick={(): void => onRedirectWithScore("/register")}
          fontSize="14px"
          minWidth="0"
        >
          register
        </Button>{" "}
        to submit a leaderboard entry.
      </ExplainerText>
    );
  }

  if (scoreQuizLoggedIn) {
    return (
      <ExplainerText>
        {t.gameOverModalExplainerText.scoreQuizLoggedInExplainer}
      </ExplainerText>
    );
  }

  if (!isLoading && !existingEntry) {
    return (
      <ExplainerText>
        {t.gameOverModalExplainerText.noExistingEntryExplainer}
      </ExplainerText>
    );
  }

  return (
    <Box>
      <ExplainerText textAlign="left" fontWeight="bold" color="black">
        {t.gameOverModalExplainerText.existingEntry}
      </ExplainerText>
      <Box marginY={3}>
        <GameExistingEntry isLoading={isLoading} {...existingEntry} />
      </Box>
      <ExplainerText marginTop={2}>
        {t.gameOverModalExplainerText.existingEntryExplainer}
      </ExplainerText>
    </Box>
  );
};

export default GameOverModalExplainerText;
