import React, { useCallback, useState } from "react";
import { debounce } from "debounce";
import PropTypes from "prop-types";
import {
  Box,
  Flex,
  useBreakpointValue,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { SVGMap } from "react-svg-map";
import { UKCounties } from "@geobuff/maps";
import { useTimer } from "react-timer-hook";

import CountiesResultsListContainer from "../../containers/CountiesResultsListContainer";
import GameOverModalContainer from "../../containers/GameOverModalContainer";
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
  resetGame,
}) => {
  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });
  const [timeRemaining, setTimeRemaining] = useState(new Date().getMinutes());
  const [time, setTime] = useState(0);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [tooltipText, setTooltipText] = useState();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipTop, setTooltipTop] = useState(0);
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const [gameStartText, setGameStartText] = useState("START");

  const handleDebounceChange = useCallback(debounce(onChange, 30), [onChange]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { seconds, minutes, restart, pause } = useTimer({
    timeRemaining,
  });

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

  const mouseOver = (event) => {
    if (hasGameStarted) return;
    setTooltipText(event.target.getAttribute("name"));
  };

  const mouseMove = (event) => {
    if (hasGameStarted || !tooltipText) return;
    setTooltipOpen(true);
    setTooltipTop(event.clientY + 10);
    setTooltipLeft(event.clientX - 100);
  };

  const mouseOut = () => {
    if (hasGameStarted) return;
    setTooltipText(null);
    setTooltipOpen(false);
  };

  return (
    <Box width="100%" height="100vh" backgroundColor="#276F86">
      <GameOverModalContainer
        quiz={Quizzes.UKCounties}
        score={score}
        time={time}
        isOpen={isOpen}
        onClose={onClose}
      />

      {shouldDisplayOnMobile && (
        <GameInputBanner
          quiz={Quizzes.UKCounties}
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
            <Sidebar heading={getTitle(Quizzes.UKCounties)}>
              <Box>
                <GameInputCard
                  quiz={Quizzes.UKCounties}
                  recents={recentCounties}
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
                <CountiesResultsListContainer
                  checkedCounties={checkedCounties}
                />
              </Box>
            </Sidebar>
          </Box>
        )}

        <Box width="100%">
          <Box pt={2} textAlign="center">
            <Tooltip
              label={tooltipText}
              position="absolute"
              top={tooltipTop}
              left={tooltipLeft}
              isOpen={tooltipOpen}
            >
              <SVGMap
                map={UKCounties}
                className="quiz-map"
                locationClassName={getLocationClassName}
                onLocationMouseOver={mouseOver}
                onLocationMouseMove={mouseMove}
                onLocationMouseOut={mouseOut}
              />
            </Tooltip>
          </Box>

          {shouldDisplayOnMobile && (
            <GameBottomSheetModal
              quiz={Quizzes.UKCounties}
              checked={checkedCounties}
              recents={recentCounties}
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
  resetGame: PropTypes.func,
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
  resetGame: () => {},
};

export default UKCountiesGame;
