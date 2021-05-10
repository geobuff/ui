import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
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
import GameFlag from "../GameFlag/GameFlag";

import { groupMapping } from "../../helpers/mapping";
import { getResults } from "../../helpers/results-list";

import {
  findSubmissionByNames,
  findSubmissionsByPrefixes,
} from "../../helpers/game";

const GameFlagQuiz = ({ quiz, mapping }) => {
  const [checkedSubmissions, setCheckedSubmissions] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [hasGameStopped, setHasGameStopped] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(new Date().getMinutes());

  const { isOpen, onOpen, onClose } = useDisclosure();

  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });

  const handleExpire = () => {
    setTimeout(() => {
      setHasGameStarted(false);
      setHasGameStopped(true);
      onOpen();
    }, 50);
  };

  const { seconds, minutes, restart, pause } = useTimer({
    timeRemaining,
    onExpire: () => {
      pause();
      handleExpire(seconds, minutes);
    },
  });

  const quizDateTime = useCallback(
    () => DateTime.now().plus({ seconds: quiz.time }),
    [quiz]
  );

  useEffect(() => {
    if (hasGameStarted) {
      restart(quizDateTime());
    }
  }, [timeRemaining, hasGameStarted]);

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
    setHasGameStarted(false);
    setHasGameStopped(true);
    onOpen();
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
    handleChangeDebounced(event);
  };

  const handleChangeDebounced = debounce(30, (event) => checkSubmission(event));

  const checkSubmission = (event) => {
    const submission = event.target.value.trim();

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

      setScore(updatedCheckedSubmissions.length);
      setRecentSubmissions(updatedRecentSubmissions.reverse());
      setCheckedSubmissions(updatedCheckedSubmissions);

      if (updatedCheckedSubmissions.length === mapping.length) {
        handleGameStop();
      }
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
      <Head>
        <title>{quiz.name} - GeoBuff</title>
      </Head>
      <GameOverModalContainer
        quiz={quiz}
        score={score}
        time={
          minutes === 0 && seconds === 0
            ? quiz.time
            : quiz.time - (seconds + minutes * 60)
        }
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
                    checked={checkedSubmissions}
                    map={groupMapping(mapping)}
                    hasGameStopped={hasGameStopped}
                  />
                ) : (
                  <ResultsListWrapper
                    quiz={quiz}
                    results={getResults(
                      mapping,
                      checkedSubmissions,
                      hasGameStopped
                    )}
                  />
                )}
              </Box>
            </Sidebar>
          </Box>
        )}

        {checkedSubmissions.length !== mapping.length && (
          <GameFlag
            code={
              mapping.find(
                (x) => !checkedSubmissions.map((x) => x.code).includes(x.code)
              ).code
            }
          />
        )}

        {shouldDisplayOnMobile && (
          <GameBottomSheetModal
            quiz={quiz}
            mapping={mapping}
            checked={checkedSubmissions}
            recents={recentSubmissions}
            hasGameStarted={hasGameStarted}
            hasGameStopped={hasGameStopped}
            isOpen={!hasGameStopped || !isOpen}
            onGameStart={handleGameStart}
            onGameStop={handleGameStop}
          />
        )}
      </Flex>
    </Box>
  );
};

GameFlagQuiz.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.number,
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
};

GameFlagQuiz.defaultProps = {
  quiz: {},
  submissions: [],
  map: {},
};

export default GameFlagQuiz;
