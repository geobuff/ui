import React, { FC } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

import GameExistingEntry from "../../GameExistingEntry";
import { LeaderboardEntry } from "../../../types/leaderboard-entry";

const explainerScoreQuizLoggedIn =
  "If this score is greater than your existing score, we will update it behind the scenes.";
const explainerNoExistingEntry =
  "No existing entry for this quiz. By clicking submit you will create a new leaderboard entry.";
const explainerExistingEntry =
  "You have an existing entry for this quiz. By clicking submit you will update your existing entry.";

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
  const scoreQuizNotLoggedIn = !onSubmit && !isLoggedIn;
  const scoreQuizLoggedIn = !onSubmit && isLoggedIn;
  const leaderboardQuizNotLoggedIn = onSubmit && !isLoggedIn;
  const noExistingEntry = onSubmit && isLoggedIn && !existingEntry;

  const shouldShowExistingEntry = onSubmit && isLoggedIn && !!existingEntry;

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
    return <ExplainerText> {explainerScoreQuizLoggedIn}</ExplainerText>;
  }

  if (noExistingEntry) {
    return <ExplainerText> {explainerNoExistingEntry}</ExplainerText>;
  }

  if (shouldShowExistingEntry) {
    return (
      <Box>
        <ExplainerText textAlign="left" fontWeight="bold" color="black">
          {"EXISTING ENTRY"}
        </ExplainerText>
        <Box marginY={3}>
          <GameExistingEntry isLoading={isLoading} {...existingEntry} />
        </Box>
        <ExplainerText marginTop={2}>{explainerExistingEntry}</ExplainerText>
      </Box>
    );
  }

  return null;
};

export default GameOverModalExplainerText;
