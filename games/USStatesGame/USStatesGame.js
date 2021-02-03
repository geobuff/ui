import React, { useCallback, useState } from "react";
import { debounce } from "debounce";
import PropTypes from "prop-types";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/core";
import { SVGMap } from "react-svg-map";
import { USStates } from "@geobuff/maps";

import StatesResultsListContainer from "../../containers/StatesResultsListContainer";
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
}) => {
  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });

  const [timeRemaining, setTimeRemaining] = useState(new Date().getMinutes());
  const [hasGameStarted, setHasGameStarted] = useState(false);

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

  const handleDebounceChange = useCallback(debounce(onChange, 30), [onChange]);

  const handleChange = (event) => {
    onChangeInputValue(event.target.value);
    handleDebounceChange(event.target.value);
  };

  const handleGameStart = () => {
    setTimeRemaining(timeFiveMinutes());
    setHasGameStarted(true);
  };

  const handleGameStop = () => {
    setTimeRemaining(null);
    setHasGameStarted(false);
  };

  return (
    <Box width="100%" height="100vh" backgroundColor="#276F86">
      {shouldDisplayOnMobile && (
        <GameInputBanner
          quiz={Quizzes.USStates}
          score={score}
          errorMessage={errorMessage}
          expiryTimestamp={timeRemaining}
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
                  timeRemaining={timeRemaining}
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
              recentCountries={recentStates}
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
};

export default USStatesGame;
