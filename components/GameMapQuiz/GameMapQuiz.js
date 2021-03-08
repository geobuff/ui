import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { debounce } from "debounce";

import { Box, Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";

import CountryResultsListContainer from "../../containers/CountryResultsListContainer";
import GameBottomSheetModal from "../GameBottomSheetModal";
import GameInputBanner from "../GameInputBanner";
import GameInputCard from "../GameInputCard";
import Sidebar from "../Sidebar";

import GameOverModalContainer from "../../containers/GameOverModalContainer";

import { timeFifteenMinutes } from "../../helpers/time";
import { useTimer } from "react-timer-hook";
import GameMap from "../GameMap/GameMap";

const GameMapQuiz = ({
  quiz,
  map,
  checkedCountries,
  recentCountries,
  score,
  errorMessage,
  hasError,
  inputValue,
  onChange,
  onChangeInputValue,
  onClearInput,
  resetGame,
}) => {
  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });

  const [timeRemaining, setTimeRemaining] = useState(new Date().getMinutes());
  const [time, setTime] = useState(0);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const [gameStartText, setGameStartText] = useState("START");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDebounceChange = useCallback(debounce(onChange, 30), [onChange]);

  const { seconds, minutes, restart, pause } = useTimer({
    timeRemaining,
  });

  const handleLocationClassName = (location) => {
    if (
      checkedCountries.length
        ? checkedCountries.find(
            (country) =>
              country.name.toLowerCase() === location.name.toLowerCase()
          )
        : false
    ) {
      return `selected`;
    }
  };

  const handleChange = (event) => {
    onChangeInputValue(event.target.value);
    handleDebounceChange(event.target.value);
  };

  const handleGameStart = () => {
    resetGame();
    restart(timeFifteenMinutes());
    setTimeRemaining(timeFifteenMinutes());
    setHasGameStarted(true);
  };

  const handleGameStop = () => {
    pause();
    // TODO: Update 900 to be a quiz constant
    setTime(900 - (seconds + minutes * 60));
    setHasGameStarted(false);
    onOpen();
    if (gameStartText === "START") {
      setGameStartText("RETRY");
    }
  };

  return (
    <Box width="100%" height="100vh" backgroundColor="#276F86">
      <GameOverModalContainer
        quiz={quiz}
        score={score}
        time={time}
        isOpen={isOpen}
        onClose={onClose}
      />

      {shouldDisplayOnMobile && (
        <GameInputBanner
          quiz={quiz}
          score={score}
          errorMessage={errorMessage}
          expiryTimestamp={{ seconds, minutes }}
          hasError={hasError}
          hasGameStarted={hasGameStarted}
          inputValue={inputValue}
          onChange={handleChange}
          onClearInput={onClearInput}
        />
      )}

      <Flex>
        {!shouldDisplayOnMobile && (
          <Box height="100%">
            <Sidebar heading={quiz.name}>
              <Box>
                <GameInputCard
                  quiz={quiz}
                  recents={recentCountries}
                  score={score}
                  timeRemaining={{ seconds, minutes }}
                  gameStartText={gameStartText}
                  errorMessage={errorMessage}
                  hasError={hasError}
                  hasGameStarted={hasGameStarted}
                  inputValue={inputValue}
                  onChange={handleChange}
                  onClearInput={onClearInput}
                  onGameStart={handleGameStart}
                  onGameStop={handleGameStop}
                />
                <CountryResultsListContainer
                  quiz={quiz}
                  checkedCountries={checkedCountries}
                />
              </Box>
            </Sidebar>
          </Box>
        )}

        <GameMap
          map={map}
          showTooltip={!hasGameStarted}
          onLocationClassName={handleLocationClassName}
        />

        {shouldDisplayOnMobile && (
          <GameBottomSheetModal
            quiz={quiz}
            checked={checkedCountries}
            recents={recentCountries}
            hasGameStarted={hasGameStarted}
            gameStartText={gameStartText}
            onGameStart={handleGameStart}
            onGameStop={handleGameStop}
          />
        )}
      </Flex>
    </Box>
  );
};

GameMapQuiz.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxScore: PropTypes.number,
    time: PropTypes.number,
    imageUrl: PropTypes.string,
    verb: PropTypes.string,
    apiPath: PropTypes.string,
    hasLeaderboard: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
  checkedCountries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  recentCountries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  score: PropTypes.number,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  inputValue: PropTypes.string,
  onChange: PropTypes.func,
  onChangeInputValue: PropTypes.func,
  onClearInput: PropTypes.func,
  resetGame: PropTypes.func,
  map: PropTypes.any,
};

GameMapQuiz.defaultProps = {
  quiz: {},
  checkedCountries: [],
  recentCountries: [],
  score: 0,
  errorMessage: "",
  hasError: false,
  inputValue: "",
  onChange: () => {},
  onChangeInputValue: () => {},
  onClearInput: () => {},
  resetGame: () => {},
  map: null,
};

export default GameMapQuiz;
