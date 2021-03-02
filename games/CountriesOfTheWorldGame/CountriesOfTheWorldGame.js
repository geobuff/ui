import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { debounce } from "debounce";
import { Box, Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { SVGMap } from "react-svg-map";
import { WorldCountries } from "@geobuff/maps";

import CountryResultsListContainer from "../../containers/CountryResultsListContainer";
import GameBottomSheetModal from "../../components/GameBottomSheetModal";
import GameInputBanner from "../../components/GameInputBanner";
import GameInputCard from "../../components/GameInputCard";
import Sidebar from "../../components/Sidebar";
import GameOverModalContainer from "../../containers/GameOverModalContainer/GameOverModalContainer";
import MapTooltip from "../../components/MapTooltip";

import { Quizzes, getTitle } from "../../helpers/quizzes";
import { timeFifteenMinutes } from "../../helpers/time";
import { useTimer } from "react-timer-hook";

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
  const [time, setTime] = useState(0);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [tooltipText, setTooltipText] = useState();
  const [tooltipStyle, setTooltipStyle] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDebounceChange = useCallback(debounce(onChange, 30), [onChange]);

  const { seconds, minutes, restart, pause } = useTimer({
    timeRemaining,
  });

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

  const handleChange = (event) => {
    onChangeInputValue(event.target.value);
    handleDebounceChange(event.target.value);
  };

  const handleGameStart = () => {
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
  };

  const mouseOver = (event) => {
    if (hasGameStarted) return;
    setTooltipText(event.target.getAttribute("name"));
  };

  const mouseMove = (event) => {
    if (hasGameStarted || !tooltipText) return;
    setTooltipStyle({
      display: "block",
      top: event.clientY + 10,
      left: event.clientX - 100,
    });
  };

  const mouseOut = () => {
    if (hasGameStarted) return;
    setTooltipText(null);
    setTooltipStyle({
      display: "none",
    });
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
            <Sidebar heading={getTitle(Quizzes.CountriesOfTheWorld)}>
              <Box>
                <GameInputCard
                  quiz={Quizzes.CountriesOfTheWorld}
                  recents={recentCountries}
                  score={score}
                  timeRemaining={{ seconds, minutes }}
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
              onLocationMouseOver={mouseOver}
              onLocationMouseMove={mouseMove}
              onLocationMouseOut={mouseOut}
            />
          </Box>

          <MapTooltip value={tooltipText} style={tooltipStyle} />

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
