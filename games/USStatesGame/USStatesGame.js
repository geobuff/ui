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

const timeFiveMinutes = () =>
  new Date().setMinutes(new Date().getMinutes() + 5);

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
          errorMessage={errorMessage}
          expiryTimestamp={timeRemaining}
          hasError={hasError}
          hasGameStarted={hasGameStarted}
          inputValue={inputValue}
          onChange={handleChange}
          onClearInput={onClearInput}
          score={score}
          total={51}
          verb="states"
        />
      )}

      <Flex>
        {!shouldDisplayOnMobile && (
          <Box height="100%">
            <Sidebar heading="US States Quiz">
              <Box>
                <GameInputCard
                  countries={recentStates}
                  errorMessage={errorMessage}
                  hasError={hasError}
                  hasGameStarted={hasGameStarted}
                  inputValue={inputValue}
                  onChange={handleChange}
                  onClearInput={onClearInput}
                  onGameStart={handleGameStart}
                  onGameStop={handleGameStop}
                  score={score}
                  timeRemaining={timeRemaining}
                  total={51}
                  verb="states"
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
              className="countries-of-world"
              locationClassName={getLocationClassName}
            />
          </Box>

          {shouldDisplayOnMobile && (
            <GameBottomSheetModal
              title="US States Quiz"
              checkedCountries={checkedStates}
              hasGameStarted={hasGameStarted}
              recentCountries={recentStates}
              onGameStart={handleGameStart}
              onGameStop={handleGameStop}
              verb="states"
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
