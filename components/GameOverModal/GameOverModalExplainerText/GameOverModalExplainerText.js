import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Text } from "@chakra-ui/react";

import GameExistingEntry from "../../GameExistingEntry";

const explainerScoreQuizLoggedIn =
  "If this score is greater than your existing score, we will update it behind the scenes.";
const explainerNoExistingEntry =
  "No existing entry for this quiz. By clicking submit you will create a new leaderboard entry.";
const explainerExistingEntry =
  "You have an existing entry for this quiz. By clicking submit you will update your existing entry.";

const ExplainerText = ({ children, ...props }) => {
  return (
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
};

const GameOverModalExplainerText = ({
  onSubmit,
  onRedirectWithScore,
  isLoggedIn,
  isLoading,
  existingEntry,
}) => {
  const scoreQuizNotLoggedIn = !onSubmit && !isLoggedIn;
  const scoreQuizLoggedIn = !onSubmit && isLoggedIn;
  const leaderboardQuizNotLoggedIn = onSubmit && !isLoggedIn;
  const noExistingEntry = onSubmit && isLoggedIn && !existingEntry;

  const shouldShowExistingEntry = onSubmit && isLoggedIn && !!existingEntry;

  if (scoreQuizNotLoggedIn || leaderboardQuizNotLoggedIn) {
    return (
      <ExplainerText>
        You must{" "}
        <Button
          variant="link"
          onClick={() => onRedirectWithScore("/login")}
          fontSize="14px"
          minWidth="0"
        >
          login
        </Button>{" "}
        or{" "}
        <Button
          variant="link"
          onClick={() => onRedirectWithScore("/register")}
          fontSize="14px"
          minWidth="0"
        >
          register
        </Button>{" "}
        to update your high score.
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

ExplainerText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.func,
  ]),
};
ExplainerText.defaultProps = {
  children: null,
};

GameOverModalExplainerText.propTypes = {
  onSubmit: PropTypes.func,
  onRedirectWithScore: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  isLoading: PropTypes.bool,
  existingEntry: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    rank: PropTypes.number,
    score: PropTypes.number,
    time: PropTypes.number,
    username: PropTypes.string,
    countryCode: PropTypes.string,
  }),
};
GameOverModalExplainerText.defaultProps = {
  onSubmit: () => {},
  onRedirectWithScore: () => {},
  isLoggedIn: false,
  isLoading: true,
  existingEntry: null,
};

export default GameOverModalExplainerText;
