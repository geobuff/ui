import React, { useCallback, useState } from "react";
import { debounce } from "debounce";
import PropTypes from "prop-types";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { SVGMap } from "react-svg-map";
import { UKCounties } from "@geobuff/maps";

import CountiesResultsListContainer from "../../containers/CountiesResultsListContainer";
import GameBottomSheetModal from "../../components/GameBottomSheetModal";
import GameInputBanner from "../../components/GameInputBanner";
import GameInputCard from "../../components/GameInputCard";
import Sidebar from "../../components/Sidebar";
import { timeFiveMinutes } from "../../helpers/time";
import { getTitle, Quizzes } from "../../helpers/quizzes";

const UKCountiesGame = ({
  checkedCounties,
  recentCounties,
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
      checkedCounties.length
        ? checkedCounties.find(
            (county) =>
              county.name.toLowerCase() === location.name.toLowerCase()
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
          quiz={Quizzes.UKCounties}
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
            <Sidebar heading={getTitle(Quizzes.UKCounties)}>
              <Box>
                <GameInputCard
                  quiz={Quizzes.UKCounties}
                  recents={recentCounties}
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
                <CountiesResultsListContainer
                  checkedCounties={checkedCounties}
                />
              </Box>
            </Sidebar>
          </Box>
        )}

        <Box width="100%">
          <Box pt={2} textAlign="center">
            <SVGMap
              map={UKCounties}
              className="quiz-map"
              locationClassName={getLocationClassName}
            />
          </Box>

          {shouldDisplayOnMobile && (
            <GameBottomSheetModal
              quiz={Quizzes.UKCounties}
              checked={checkedCounties}
              recents={recentCounties}
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

UKCountiesGame.propTypes = {
  checkedCounties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  recentCounties: PropTypes.arrayOf(
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

UKCountiesGame.defaultProps = {
  checkedCounties: [],
  recentCounties: [],
  score: 0,
  errorMessage: "",
  hasError: false,
  inputValue: "",
  onChange: () => {},
  onChangeInputValue: () => {},
  onClearInput: () => {},
};

export default UKCountiesGame;
