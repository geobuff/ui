import React, { useCallback, useState } from "react";
import { debounce } from "debounce";
import PropTypes from "prop-types";

import { Box, Flex, useBreakpointValue } from "@chakra-ui/core";

import { SVGMap } from "react-svg-map";
import { WorldCountries } from "@geobuff/maps";

import CountryResultsListContainer from "../.../../../components/CountryResultsListContainer";
import GameBottomSheetModal from "../../components/GameBottomSheetModal";
import GameInputBanner from "../../components/GameInputBanner";
import GameInputCard from "../../components/GameInputCard";
import Sidebar from "../../components/Sidebar";

const timeFifteenMinutes = () =>
  new Date().setMinutes(new Date().getMinutes() + 15);

const CountriesOfTheWorldGame = ({
  checkedCountries,
  errorMessage,
  hasError,
  inputValue,
  onChange,
  onChangeInputValue,
  onClearInput,
  recentCountries,
  score,
}) => {
  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });

  const [timeRemaining, setTimeRemaining] = useState(new Date().getMinutes());

  const [hasGameStarted, setHasGameStarted] = useState(false);

  const getLocationClassName = (location) => {
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
          total={193}
          verb="countries"
        />
      )}

      <Flex>
        {!shouldDisplayOnMobile && (
          <Box height="100%">
            <Sidebar heading="Countries of the World Quiz">
              <Box>
                <GameInputCard
                  countries={recentCountries}
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
                  total={193}
                />
                <CountryResultsListContainer
                  checkedCountries={checkedCountries}
                />
              </Box>
            </Sidebar>
          </Box>
        )}

        <Box width="100%">
          <Box pt={2} textAlign="center">
            <SVGMap
              map={WorldCountries}
              className="countries-of-world"
              locationClassName={getLocationClassName}
              // locationClassName="highlight-on-hover"
            />
          </Box>

          {shouldDisplayOnMobile && (
            <GameBottomSheetModal
              checkedCountries={checkedCountries}
              hasGameStarted={hasGameStarted}
              recentCountries={recentCountries}
              onGameStart={handleGameStart}
              onGameStop={handleGameStop}
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

CountriesOfTheWorldGame.propTypes = {
  checkedCountries: PropTypes.arrayOf(
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
  recentCountries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  score: PropTypes.number,
};

CountriesOfTheWorldGame.defaultProps = {
  checkedCountries: [],
  countries: [],
  errorMessage: "",
  hasError: false,
  inputValue: "",
  onChange: () => {},
  onChangeInputValue: () => {},
  onClearInput: () => {},
  recentCountries: [],
  score: 0,
};

export default CountriesOfTheWorldGame;
