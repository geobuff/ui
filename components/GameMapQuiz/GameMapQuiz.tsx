import React, { useState, useEffect, useCallback, FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { debounce } from "throttle-debounce";

import {
  Box,
  Button,
  Fade,
  Flex,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import { useTimer } from "react-timer-hook";
import { DateTime } from "luxon";

import GameBottomSheetModal from "../GameBottomSheetModal";
import GameInputBanner from "../GameInputBanner";
import GameInputCard from "../GameInputCard";
import Sidebar from "../Sidebar";
import ResultsMap from "../ResultsMap";
import GameMap from "../GameMap";

import GameOverModalContainer from "../../containers/GameOverModalContainer";

import SolidChevronUp from "../../Icons/SolidChevronUp";
import SolidChevronDown from "../../Icons/SolidChevronDown";

import useCurrentUser from "../../hooks/UseCurrentUser";
import useWarnIfActiveGame from "../../hooks/useWarnIfActiveGame";

import axiosClient from "../../axios/axiosClient";

import { groupMapping } from "../../helpers/mapping";

import {
  findSubmissionByNames,
  findSubmissionsByPrefixes,
} from "../../helpers/game";
import { Quiz } from "../../types/quiz";
import { Mapping } from "../../types/mapping";
import { SVGLocation } from "../../types/svg-location";
import { Map } from "../../types/map";

interface Props {
  quiz?: Quiz;
  mapping?: Mapping[];
  map?: Map;
}

const GameMapQuiz: FC<Props> = ({ quiz = null, mapping = [], map = null }) => {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useCurrentUser();

  const [checkedSubmissions, setCheckedSubmissions] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [hasGameRunOnce, setHasGameRunOnce] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [hasGameStopped, setHasGameStopped] = useState(false);
  const [isXPUpdated, setXPUpdated] = useState(false);
  const [leaderboardEntrySubmitted, setLeaderboardEntrySubmitted] = useState(
    false
  );
  const [timeRemaining, setTimeRemaining] = useState(new Date().getMinutes());

  useWarnIfActiveGame(hasGameStarted);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    if (!isUserLoading && user && router.query.data) {
      const data = JSON.parse(router.query.data[0]);
      axiosClient
        .get(`/tempscores/${data.tempScoreId}`)
        .then((response) => {
          const tempScore = response.data;
          setScore(tempScore.score);
          restart(DateTime.now().plus({ seconds: quiz.time - tempScore.time }));
          handleGameStop();
        })
        .catch(() => {
          //Ignore invalid tempscore.
        });
    }
  }, [isUserLoading, user, router.query]);

  const handleExpire = () => {
    setTimeout(() => {
      setHasGameStarted(false);
      setHasGameStopped(true);
      onOpen();
    }, 50);
  };

  const { seconds, minutes, restart, pause } = useTimer({
    expiryTimestamp: timeRemaining,
    onExpire: () => {
      pause();
      handleExpire();
    },
  });

  const quizDateTime = useCallback(
    () => DateTime.now().plus({ seconds: quiz.time }),
    [quiz]
  );

  useEffect(() => {
    if (hasGameStarted) {
      restart(quizDateTime());
      if (!hasGameRunOnce) {
        setHasGameRunOnce(true);
      }
    }
  }, [timeRemaining, hasGameStarted]);

  const handleLocationClassName = (location: SVGLocation) => {
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
    setXPUpdated(false);
    setLeaderboardEntrySubmitted(false);
  };

  const handleGameStop = () => {
    pause();
    setHasGameStarted(false);
    setHasGameStopped(true);
    onOpen();
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);

    if (event.target.value?.length >= 2) {
      handleChangeDebounced(event);
    }
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

  if (shouldDisplayOnMobile === undefined) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{quiz.name} - GeoBuff</title>
      </Head>

      <Flex
        direction="column"
        flex={1}
        width="100%"
        minHeight="100%"
        backgroundColor="#276F86"
      >
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

        <Flex grow={1} direction={{ base: "column", md: "row" }}>
          {!shouldDisplayOnMobile && (
            <Fade in>
              <Box minHeight="100%">
                <Sidebar heading={quiz.name} quiz={quiz}>
                  <Flex direction="column" height="100%">
                    <GameInputCard
                      quiz={quiz}
                      recents={recentSubmissions}
                      score={score}
                      timeRemaining={{ seconds, minutes }}
                      errorMessage={errorMessage}
                      hasError={hasError}
                      hasGameRunOnce={hasGameRunOnce}
                      hasGameStarted={hasGameStarted}
                      hasGameStopped={hasGameStopped}
                      inputValue={inputValue}
                      onChange={handleChange}
                      onClearInput={onClearInput}
                      onGameStart={handleGameStart}
                      onGameStop={handleGameStop}
                    />
                    <ResultsMap
                      checked={checkedSubmissions}
                      map={groupMapping(mapping)}
                      hasGameStopped={hasGameStopped}
                      hasGroupings={quiz.hasGrouping}
                      hasFlags={quiz.hasFlags}
                    />
                  </Flex>
                </Sidebar>
              </Box>
            </Fade>
          )}

          <Fade in>
            <GameMap
              map={map}
              showTooltip={!hasGameStarted}
              onLocationClassName={handleLocationClassName}
            />
          </Fade>

          {shouldDisplayOnMobile && (
            <GameBottomSheetModal
              quiz={quiz}
              mapping={mapping}
              checked={checkedSubmissions}
              recents={recentSubmissions}
              hasGameRunOnce={hasGameRunOnce}
              hasGameStarted={hasGameStarted}
              hasGameStopped={hasGameStopped}
              isOpen={!hasGameStopped || !isOpen}
              onGameStart={handleGameStart}
              onGameStop={handleGameStop}
            />
          )}
        </Flex>
      </Flex>

      {hasGameRunOnce && hasGameStopped && !leaderboardEntrySubmitted && (
        <>
          {shouldDisplayOnMobile ? (
            <Box position="fixed" top="142px" left="20px">
              <Button
                height="38px"
                width="38px"
                onClick={onOpen}
                opacity="0.85"
              >
                <SolidChevronDown />
              </Button>
            </Box>
          ) : (
            <Box position="fixed" bottom="20px" right="20px">
              <Button onClick={onOpen} opacity="0.85">
                {"Game Details"}
                <SolidChevronUp marginLeft={2} />
              </Button>
            </Box>
          )}
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
            isXPUpdated={isXPUpdated}
            setXPUpdated={setXPUpdated}
            setLeaderboardEntrySubmitted={setLeaderboardEntrySubmitted}
          />
        </>
      )}
    </>
  );
};

export default GameMapQuiz;
