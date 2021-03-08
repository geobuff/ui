import React, { useCallback, useState, useEffect } from "react";
import { debounce } from "debounce";
import PropTypes from "prop-types";
import {
  Box,
  Flex,
  useBreakpointValue,
  useDisclosure,
  Tooltip,
  useToast,
} from "@chakra-ui/react";

import { SVGMap } from "react-svg-map";
import { USStates } from "@geobuff/maps";
import { useTimer } from "react-timer-hook";

import StatesResultsListContainer from "../../containers/StatesResultsListContainer";
import GameOverModalContainer from "../../containers/GameOverModalContainer/GameOverModalContainer";
import GameBottomSheetModal from "../../components/GameBottomSheetModal";
import GameInputBanner from "../../components/GameInputBanner";
import GameInputCard from "../../components/GameInputCard";
import Sidebar from "../../components/Sidebar";
import MapInteractionCSS from "../../components/MapInteractionCSS";
import { timeFiveMinutes } from "../../helpers/time";

const USStatesGame = ({
  quiz,
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
  const toast = useToast();
  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });

  const [timeRemaining, setTimeRemaining] = useState(new Date().getMinutes());
  const [time, setTime] = useState(0);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [tooltipText, setTooltipText] = useState();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipTop, setTooltipTop] = useState(0);
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const [gameStartText, setGameStartText] = useState("START");
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDebounceChange = useCallback(debounce(onChange, 30), [onChange]);

  const { seconds, minutes, restart, pause } = useTimer({
    timeRemaining,
  });

  useEffect(() => {
    if (scoreSubmitted) {
      toast({
        title: "Score Submitted",
        description: "We've updated your high score for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setScoreSubmitted(false);
    }
  }, [scoreSubmitted]);

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
        quiz={quiz}
        score={score}
        time={time}
        isOpen={isOpen}
        onClose={onClose}
        setScoreSubmitted={setScoreSubmitted}
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
                <StatesResultsListContainer
                  quiz={quiz}
                  checkedStates={checkedStates}
                />
              </Box>
            </Sidebar>
          </Box>
        )}

        <Box width="100%">
          <Box pt={2} textAlign="center" height="100%">
            <Tooltip
              label={tooltipText}
              position="absolute"
              top={tooltipTop}
              left={tooltipLeft}
              isOpen={tooltipOpen}
            >
              <MapInteractionCSS>
                <SVGMap
                  map={USStates}
                  className="quiz-map"
                  locationClassName={getLocationClassName}
                  onLocationMouseOver={mouseOver}
                  onLocationMouseMove={mouseMove}
                  onLocationMouseOut={mouseOut}
                />
              </MapInteractionCSS>
            </Tooltip>
          </Box>

          {shouldDisplayOnMobile && (
            <GameBottomSheetModal
              quiz={quiz}
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
  quiz: {},
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
