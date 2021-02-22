import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { debounce } from "debounce";
import { Box, Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/core";
import { SVGMap } from "react-svg-map";
import { WorldCountries } from "@geobuff/maps";

import CountryResultsListContainer from "../../containers/CountryResultsListContainer";
import GameBottomSheetModal from "../../components/GameBottomSheetModal";
import GameInputBanner from "../../components/GameInputBanner";
import GameInputCard from "../../components/GameInputCard";
import Sidebar from "../../components/Sidebar";
import GameOverModalContainer from "../../containers/GameOverModalContainer/GameOverModalContainer";

import { Quizzes, getTitle } from "../../helpers/quizzes";
import { timeFifteenMinutes } from "../../helpers/time";

const CountriesOfTheWorldGame = ({
  checkedCountries,
  recentCountries,
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
  const [time, setTime] = useState();
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
    setTime(timeRemaining);
    setTimeRemaining(null);
    setHasGameStarted(false);
    onOpen();
  };

  return (
    <Box width="100%" height="100vh" backgroundColor="#276F86">
      <GameOverModalContainer
        quiz={Quizzes.CountriesOfTheWorld}
        score={score}
        time={time}
        isOpen={isOpen}
        onClose={onClose}
      />

      {shouldDisplayOnMobile && (
        <GameInputBanner
          quiz={Quizzes.CountriesOfTheWorld}
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
            <Sidebar heading={getTitle(Quizzes.CountriesOfTheWorld)}>
              <Box>
                <GameInputCard
                  quiz={Quizzes.CountriesOfTheWorld}
                  recents={recentCountries}
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
              className="quiz-map"
              locationClassName={getLocationClassName}
            />
          </Box>

          {shouldDisplayOnMobile && (
            <GameBottomSheetModal
              quiz={Quizzes.CountriesOfTheWorld}
              checked={checkedCountries}
              recents={recentCountries}
              hasGameStarted={hasGameStarted}
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
};

CountriesOfTheWorldGame.defaultProps = {
  checkedCountries: [],
  recentCountries: [],
  score: 0,
  errorMessage: "",
  hasError: false,
  inputValue: "",
  onChange: () => {},
  onChangeInputValue: () => {},
  onClearInput: () => {},
};

export default CountriesOfTheWorldGame;
