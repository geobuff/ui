import React, { useCallback, useState } from "react";
import { debounce } from "debounce";
import PropTypes from "prop-types";
import { Box, Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { SVGMap } from "react-svg-map";
import { USStates } from "@geobuff/maps";
import { useTimer } from "react-timer-hook";

import StatesResultsListContainer from "../../containers/StatesResultsListContainer";
import GameOverModalContainer from "../../containers/GameOverModalContainer/GameOverModalContainer";
import GameBottomSheetModal from "../../components/GameBottomSheetModal";
import GameInputBanner from "../../components/GameInputBanner";
import GameInputCard from "../../components/GameInputCard";
import Sidebar from "../../components/Sidebar";
import { timeFiveMinutes } from "../../helpers/time";
import { Quizzes, getTitle } from "../../helpers/quizzes";

const USStatesGame = ({
  checkedStates,
  recentStates,
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

  const getLocationClassName = (location) => {
    if (
      checkedStates.length
        ? checkedStates.find(
            (state) => state.name.toLowerCase() === location.name.toLowerCase()
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
    restart(timeFiveMinutes());
    setTimeRemaining(timeFiveMinutes());
    setHasGameStarted(true);
  };

  const handleGameStop = () => {
    pause();
    // TODO: Update 300 to be a quiz constant
    setTime(300 - (seconds + minutes * 60));
    setHasGameStarted(false);
    onOpen();
    if (gameStartText === "START") {
      setGameStartText("RETRY");
    }
  };

  return (
    <Box width="100%" height="100vh" backgroundColor="#276F86">
      <GameOverModalContainer
        quiz={Quizzes.USStates}
        score={score}
        time={time}
        isOpen={isOpen}
        onClose={onClose}
      />

      {shouldDisplayOnMobile && (
        <GameInputBanner
          quiz={Quizzes.USStates}
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
            <Sidebar heading={getTitle(Quizzes.USStates)}>
              <Box>
                <GameInputCard
                  quiz={Quizzes.USStates}
                  recents={recentStates}
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
                <StatesResultsListContainer checkedStates={checkedStates} />
              </Box>
            </Sidebar>
          </Box>
        )}

        <Box width="100%">
          <Box pt={2} textAlign="center">
            <SVGMap
              map={USStates}
              className="quiz-map"
              locationClassName={getLocationClassName}
            />
          </Box>

          {shouldDisplayOnMobile && (
            <GameBottomSheetModal
              quiz={Quizzes.USStates}
              checked={checkedStates}
              recents={recentStates}
              hasGameStarted={hasGameStarted}
              gameStartText={gameStartText}
              onGameStart={handleGameStart}
              onGameStop={handleGameStop}
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

USStatesGame.propTypes = {
  checkedStates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  recentStates: PropTypes.arrayOf(
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
};

USStatesGame.defaultProps = {
  checkedStates: [],
  recentStates: [],
  score: 0,
  errorMessage: "",
  hasError: false,
  inputValue: "",
  onChange: () => {},
  onChangeInputValue: () => {},
  onClearInput: () => {},
  resetGame: () => {},
};

export default USStatesGame;
