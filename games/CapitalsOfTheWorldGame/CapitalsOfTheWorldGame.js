import React, { useCallback, useState } from "react";
import { debounce } from "debounce";
import PropTypes from "prop-types";

import { Box, Flex, useBreakpointValue } from "@chakra-ui/core";

import { SVGMap } from "react-svg-map";
import { WorldCapitals } from "@geobuff/maps";

import CapitalResultsListContainer from "../../containers/CapitalResultsListContainer";
import GameBottomSheetModal from "../../components/GameBottomSheetModal";
import GameInputBanner from "../../components/GameInputBanner";
import GameInputCard from "../../components/GameInputCard";
import Sidebar from "../../components/Sidebar";

const timeFifteenMinutes = () =>
  new Date().setMinutes(new Date().getMinutes() + 15);

const CapitalsOfTheWorldGame = ({
  checkedCapitals,
  errorMessage,
  hasError,
  inputValue,
  onChange,
  onChangeInputValue,
  onClearInput,
  recentCapitals,
  score,
}) => {
  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });
  const [timeRemaining, setTimeRemaining] = useState(new Date().getMinutes());
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const getLocationClassName = (location) => {
    if (
      checkedCapitals.length
        ? checkedCapitals.find(
            (capital) =>
              capital.name.toLowerCase() === location.name.toLowerCase()
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
    setTimeRemaining(timeFifteenMinutes());
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
          total={197}
          verb="capitals"
        />
      )}

      <Flex>
        {!shouldDisplayOnMobile && (
          <Box height="100%">
            <Sidebar heading="Capitals of the World Quiz">
              <Box>
                <GameInputCard
                  countries={recentCapitals}
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
                  total={197}
                  verb="capitals"
                />
                <CapitalResultsListContainer
                  checkedCapitals={checkedCapitals}
                />
              </Box>
            </Sidebar>
          </Box>
        )}

        <Box width="100%">
          <Box pt={2} textAlign="center">
            <SVGMap
              map={WorldCapitals}
              className="countries-of-world"
              locationClassName={getLocationClassName}
            />
          </Box>

          {shouldDisplayOnMobile && (
            <GameBottomSheetModal
              title="Capitals of the World Quiz"
              checkedCountries={checkedCapitals}
              hasGameStarted={hasGameStarted}
              recentCountries={recentCapitals}
              onGameStart={handleGameStart}
              onGameStop={handleGameStop}
              verb="capitals"
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

CapitalsOfTheWorldGame.propTypes = {
  checkedCapitals: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  inputValue: PropTypes.string,
  onChange: PropTypes.func,
  onChangeInputValue: PropTypes.func,
  onClearInput: PropTypes.func,
  recentCapitals: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  score: PropTypes.number,
};

CapitalsOfTheWorldGame.defaultProps = {
  checkedCapitals: [],
  errorMessage: "",
  hasError: false,
  inputValue: "",
  onChange: () => {},
  onChangeInputValue: () => {},
  onClearInput: () => {},
  recentCapitals: [],
  score: 0,
};

export default CapitalsOfTheWorldGame;
