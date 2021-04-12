import React, { useState, useEffect } from "react";
import { debounce } from "throttle-debounce";

import PropTypes from "prop-types";
import { Box, Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useTimer } from "react-timer-hook";
import { DateTime } from "luxon";

import GameBottomSheetModal from "../GameBottomSheetModal";
import GameInputBanner from "../GameInputBanner";
import GameInputCard from "../GameInputCard";
import Sidebar from "../Sidebar";
import ResultsMap from "../ResultsMap";
import ResultsListWrapper from "../ResultsListWrapper";
import GameOverModalContainer from "../../containers/GameOverModalContainer";
import GameMap from "../GameMap/GameMap";

import { groupMapping } from "../../helpers/mapping";
import { mergeArrayByName } from "../../helpers/array";

import {
  findSubmissionByNames,
  findSubmissionsByPrefixes,
} from "../../helpers/game";

const GameMapQuiz = ({ quiz, mapping, map }) => {
  const [checkedSubmissions, setCheckedSubmissions] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [hasGameStopped, setHasGameStopped] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(new Date().getMinutes());
  const [time, setTime] = useState(0);
  const [gameStartText, setGameStartText] = useState("START");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });

  const handleExpire = (seconds, minutes) => {
    setTime(quiz.time - (seconds + minutes * 60));
    setHasGameStarted(false);
    setHasGameStopped(true);
    onOpen();
    if (gameStartText === "START") {
      setGameStartText("RETRY");
    }
  };

  const { seconds, minutes, restart, pause } = useTimer({
    timeRemaining,
    onExpire: () => {
      pause();
      handleExpire(seconds, minutes);
    },
  });

  const quizDateTime = () => DateTime.now().plus({ seconds: quiz.time });

  useEffect(() => {
    restart(quizDateTime());
  }, [timeRemaining]);

  const handleLocationClassName = (location) => {
    if (
      checkedSubmissions.length
        ? checkedSubmissions.find(
            (submission) =>
              submission.name.toLowerCase() === location.name.toLowerCase()
          )
        : false
    ) {
      return `selected`;
    }
  };

  const handleGameStart = () => {
    setCheckedSubmissions([]);
    setRecentSubmissions([]);
    setScore(0);

    setTimeRemaining(quizDateTime());

    restart(quizDateTime());

    setHasGameStarted(true);
    setHasGameStopped(false);
  };

  const handleGameStop = () => {
    pause();
    setTime(quiz.time - (seconds + minutes * 60));
    setHasGameStarted(false);
    setHasGameStopped(true);
    onOpen();
    if (gameStartText === "START") {
      setGameStartText("RETRY");
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
    handleChangeDebounced(event);
  };

  const handleChangeDebounced = debounce(30, (event) => checkSubmission(event));

  const checkSubmission = (event) => {
    const submission = event.target.value;

    if (!submission) {
      setHasError(false);
      setErrorMessage("");
    }

    const matchedPrefixes = findSubmissionsByPrefixes(mapping, submission);
    const isChecked = findSubmissionByNames(checkedSubmissions, submission);

    if (isChecked && matchedPrefixes.length > 0) {
      return;
    }

    const matchedSubmission = findSubmissionByNames(mapping, submission);

    if (matchedSubmission && isChecked) {
      setHasError(true);
      setErrorMessage(
        `${matchedSubmission.svgName} has already been answered!`
      );
    }

    if (matchedSubmission && !isChecked) {
      setErrorMessage("");
      setHasError(false);
      setInputValue("");

      const updatedCheckedSubmissions = [
        ...checkedSubmissions,
        { ...matchedSubmission, checked: true },
      ];

      const updatedRecentSubmissions =
        updatedCheckedSubmissions.length > 3
          ? updatedCheckedSubmissions.slice(
              Math.max([...checkedSubmissions, matchedSubmission].length - 3, 1)
            )
          : updatedCheckedSubmissions;

      if (updatedCheckedSubmissions.length === mapping.length) {
        handleGameStop();
      }

      setScore(updatedCheckedSubmissions.length);
      setRecentSubmissions(updatedRecentSubmissions.reverse());
      setCheckedSubmissions(updatedCheckedSubmissions);
    }
  };

  const onClearInput = () => {
    setHasError(false);
    setErrorMessage("");
    setInputValue("");
  };

  return (
    <Box
      width="100%"
      minHeight="100%"
      backgroundColor="#276F86"
      position="fixed"
    >
      <GameOverModalContainer
        quiz={quiz}
        score={score}
        time={time}
        isOpen={isOpen}
        onClose={onClose}
      />

      {shouldDisplayOnMobile && (
        <GameInputBanner
          quiz={quiz}
          score={score}
          errorMessage={errorMessage}
          expiryTimestamp={{ seconds, minutes }}
          hasError={hasError}
          hasGameStarted={hasGameStarted}
          hasGameStopped={hasGameStopped}
          inputValue={inputValue}
          onChange={handleChange}
          onClearInput={onClearInput}
        />
      )}

      <Flex>
        {!shouldDisplayOnMobile && (
          <Box minHeight="100%">
            <Sidebar heading={quiz.name} quiz={quiz}>
              <Box>
                <GameInputCard
                  quiz={quiz}
                  recents={recentSubmissions}
                  score={score}
                  timeRemaining={{ seconds, minutes }}
                  gameStartText={gameStartText}
                  errorMessage={errorMessage}
                  hasError={hasError}
                  hasGameStarted={hasGameStarted}
                  hasGameStopped={hasGameStopped}
                  inputValue={inputValue}
                  onChange={handleChange}
                  onClearInput={onClearInput}
                  onGameStart={handleGameStart}
                  onGameStop={handleGameStop}
                />
                {quiz.hasGrouping ? (
                  <ResultsMap
                    quiz={quiz}
                    results={checkedSubmissions}
                    map={groupMapping(mapping)}
                  />
                ) : (
                  <ResultsListWrapper
                    quiz={quiz}
                    results={mergeArrayByName(mapping, checkedSubmissions)}
                  />
                )}
              </Box>
            </Sidebar>
          </Box>
        )}

        <GameMap
          map={map}
          showTooltip={!hasGameStarted}
          onLocationClassName={handleLocationClassName}
        />

        {shouldDisplayOnMobile && (
          <GameBottomSheetModal
            quiz={quiz}
            mapping={mapping}
            checked={checkedSubmissions}
            recents={recentSubmissions}
            hasGameStarted={hasGameStarted}
            hasGameStopped={hasGameStopped}
            isOpen={!hasGameStopped || !isOpen}
            gameStartText={gameStartText}
            onGameStart={handleGameStart}
            onGameStop={handleGameStop}
          />
        )}
      </Flex>
    </Box>
  );
};

GameMapQuiz.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxScore: PropTypes.number,
    time: PropTypes.number,
    mapSVG: PropTypes.string,
    imageUrl: PropTypes.string,
    verb: PropTypes.string,
    apiPath: PropTypes.string,
    route: PropTypes.string,
    hasLeaderboard: PropTypes.bool,
    hasGrouping: PropTypes.bool,
    hasFlags: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
  mapping: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
      svgName: PropTypes.string,
      alternativeNames: PropTypes.arrayOf(PropTypes.string),
      prefixes: PropTypes.arrayOf(PropTypes.string),
      group: PropTypes.string,
    })
  ),
  map: PropTypes.object,
};

GameMapQuiz.defaultProps = {
  quiz: {},
  submissions: [],
  map: {},
};

export default GameMapQuiz;
