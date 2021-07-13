import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import PropTypes from "prop-types";
import {
  Box,
  Button,
  Flex,
  useBreakpointValue,
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";

import { useTimer } from "react-timer-hook";
import { DateTime } from "luxon";

import GameBottomSheetModal from "../GameBottomSheetModal";
import GameInputBanner from "../GameInputBanner";
import GameInputCard from "../GameInputCard";
import Sidebar from "../Sidebar";
import ResultsMap from "../ResultsMap";
import GameOverModalContainer from "../../containers/GameOverModalContainer";
import SolidChevronUp from "../../Icons/SolidChevronUp";
import useCurrentUser from "../../hooks/UseCurrentUser";
import useWarnIfActiveGame from "../../hooks/useWarnIfActiveGame";
import axiosClient from "../../axios/axiosClient";
import GameFlags from "../GameFlags/GameFlags";
import FlagDropZone from "../FlagDropZone/FlagDropZone";

import { groupMapping } from "../../helpers/mapping";
import { findSubmissionByCode } from "../../helpers/game";

const GameFlagQuiz = ({ quiz, mapping }) => {
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
  const [acceptedFlag, setAcceptedFlag] = useState(
    mapping.find(
      (x) => !checkedSubmissions.map((sub) => sub.code).includes(x.code)
    )
  );

  useWarnIfActiveGame(hasGameStarted);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    if (!isUserLoading && user && router.query.data) {
      const data = JSON.parse(router.query.data);
      axiosClient
        .get(`/tempscores/${data.tempScoreId}`)
        .then((response) => {
          const tempScore = response.data;
          setScore(tempScore.score);
          restart(DateTime.now().plus({ seconds: quiz.time - tempScore.time }));
          handleGameStop();
        })
        .catch(() => {
          // Ignore invalid tempscore.
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
      if (!hasGameRunOnce) {
        setHasGameRunOnce(true);
      }
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
    setXPUpdated(false);
    setLeaderboardEntrySubmitted(false);
  };

  const handleGameStop = () => {
    pause();
    setHasGameStarted(false);
    setHasGameStopped(true);
    onOpen();
  };

  const checkSubmission = (submission) => {
    // if (submission !== acceptedFlag.code) {
    //   // Do error animation here!
    //   return;
    // }

    const matchedSubmission = findSubmissionByCode(mapping, submission);
    const isChecked = findSubmissionByCode(checkedSubmissions, submission);

    setErrorMessage("");
    setHasError(false);
    setInputValue("");

    if (isChecked) {
      return;
    }

    console.log(matchedSubmission, "matchedSubmission");

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
    // Success animation

    // get random new
    const slicedMapping = mapping.slice(0, 12);
    const nextItem =
      slicedMapping[Math.floor(Math.random() * slicedMapping.length)];

    setAcceptedFlag(nextItem);

    if (updatedCheckedSubmissions.length === mapping.length) {
      handleGameStop();
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
        isXPUpdated={isXPUpdated}
        setXPUpdated={setXPUpdated}
        setLeaderboardEntrySubmitted={setLeaderboardEntrySubmitted}
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
                  hasGameRunOnce={hasGameRunOnce}
                  hasGameStarted={hasGameStarted}
                  hasGameStopped={hasGameStopped}
                  inputValue={inputValue}
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
              </Box>
            </Sidebar>
          </Box>
        )}

        {checkedSubmissions.length !== mapping.length && (
          <Flex direction="row" width="100%" height="100%" alignItems="center">
            <FlagDropZone
              acceptedFlagName={acceptedFlag.svgName}
              hasGameStarted={hasGameStarted}
            />
            <Spacer />
            <GameFlags
              codes={mapping
                .map((x) => x.code)
                .filter(
                  (code) =>
                    !checkedSubmissions.map((x) => x.code).includes(code)
                )
                .slice(0, 12)}
              checkSubmission={checkSubmission}
              hasGameStarted={hasGameStarted}
            />
          </Flex>
        )}

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
      {hasGameRunOnce && hasGameStopped && !leaderboardEntrySubmitted && (
        <Box position="fixed" bottom="20px" right="20px">
          <Button onClick={onOpen}>
            <SolidChevronUp />
          </Button>
        </Box>
      )}
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
