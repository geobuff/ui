import React, { useState, useEffect, useCallback, FC, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Flex,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import { useTimer } from "react-timer-hook";
import { DateTime } from "luxon";

import GameInputBanner from "../GameInputBanner";
import GameInputCard from "../GameInputCard";
import Sidebar from "../Sidebar";
import ResultsMap from "../ResultsMap";
import GameOverModalContainer from "../../containers/GameOverModalContainer";
import SolidChevronUp from "../../Icons/SolidChevronUp";
import useWarnIfActiveGame from "../../hooks/useWarnIfActiveGame";
import axiosClient from "../../axios/axiosClient";
import GameFlags from "../GameFlags/GameFlags";
import FlagDropZone from "../FlagDropZone/FlagDropZone";

import { groupMapping } from "../../helpers/mapping";
import { findSubmissionByCode } from "../../helpers/game";
import GameFlagQuizBottomSheet from "./GameFlagQuizBottomSheet";
import { Mapping } from "../../types/mapping";
import { Result } from "../../types/result";
import { GameOverRedirect } from "../../types/game-over-redirect";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import {
  getRandomCollectionItems,
  getRandomCollectionItem,
} from "../../helpers/random";

const INCORRECT_ANSWER_THRESHOLD = 3;

interface Props {
  id?: number;
  time?: number;
  name?: string;
  type?: number;
  maxScore?: number;
  verb?: string;
  route?: string;
  hasLeaderboard?: boolean;
  hasFlags?: boolean;
  hasGrouping?: boolean;
  mapping?: Mapping[];
}

const GameFlagQuiz: FC<Props> = ({
  id = 0,
  time = 0,
  name = "",
  type = 0,
  maxScore = 0,
  verb = "",
  route = "",
  hasLeaderboard = false,
  hasFlags = false,
  hasGrouping = false,
  mapping = [],
}) => {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useContext(CurrentUserContext);

  const [checkedSubmissions, setCheckedSubmissions] = useState<Mapping[]>([]);
  const [recentSubmissions, setRecentSubmissions] = useState<Result[]>([]);
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
  const [acceptedFlag, setAcceptedFlag] = useState(null);
  const [remainingAnswers, setRemainingAnswers] = useState(() => mapping);
  const [currentSubmission, setCurrentSubmission] = useState("");
  const [submissionCorrect, setSubmissionCorrect] = useState(false);
  const [submissionIncorrect, setSubmissionIncorrect] = useState(false);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [disableSkipButton, setDisableSkipButton] = useState(true);

  const [flagDragItems, setFlagDragItems] = useState(() =>
    getRandomCollectionItems(mapping, 12).map((c) => c.code)
  );
  useWarnIfActiveGame(hasGameStarted);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, lg: false });
  useEffect(() => {
    if (!isUserLoading && user && router.query.data) {
      const data: GameOverRedirect = JSON.parse(router.query.data as string);
      axiosClient
        .get(`/tempscores/${data.tempScoreId}`)
        .then((response) => {
          const tempScore = response.data;
          setScore(tempScore.score);
          restart(DateTime.now().plus({ seconds: time - tempScore.time }));
          handleGameStop();
        })
        .catch(() => {
          // Ignore invalid tempscore.
        });
    }
  }, [isUserLoading, user, router.query]);

  useEffect(() => {
    checkSubmission(currentSubmission);
  }, [currentSubmission]);

  useEffect(() => {
    if (hasGameStarted) {
      restart(quizDateTime());
      if (!hasGameRunOnce) {
        setHasGameRunOnce(true);
      }
    }
  }, [timeRemaining, hasGameStarted]);

  useEffect(() => {
    if (flagDragItems.length) {
      const nextFlagCode = getRandomCollectionItem(flagDragItems);
      const nextFlagObject = mapping.find((m) => m.code === nextFlagCode);
      setAcceptedFlag(nextFlagObject);
    }
  }, [flagDragItems, mapping]);

  useEffect(() => {
    setDisableSkipButton(true);
    setTimeout(() => {
      setIncorrectCount(0);
    }, 750);
  }, [flagDragItems]);

  const handleExpire = (): void => {
    setTimeout(() => {
      setHasGameStarted(false);
      setHasGameStopped(true);
      onOpen();
    }, 50);
  };

  const { seconds, minutes, restart, pause } = useTimer({
    //@ts-ignore
    timeRemaining,
    onExpire: () => {
      pause();
      handleExpire();
    },
  });

  const quizDateTime = useCallback(
    () => DateTime.now().plus({ seconds: time }),
    [time]
  );

  const handleGameStart = (): void => {
    if (hasGameRunOnce) {
      const nextDragItems = getRandomCollectionItems(mapping, 12).map(
        (c) => c.code
      );
      setFlagDragItems(nextDragItems);
      setAcceptedFlag(getRandomCollectionItem(nextDragItems));
    }

    setRemainingAnswers(mapping);
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

  const handleGameStop = (): void => {
    pause();
    setHasGameStarted(false);
    setHasGameStopped(true);
    onOpen();
  };

  const checkSubmission = useCallback(
    (submission) => {
      if (!hasGameStarted) {
        return;
      }

      const matchedSubmission = findSubmissionByCode(mapping, submission);
      const isAcceptedAnswer = submission === acceptedFlag.code;

      setErrorMessage("");
      setHasError(false);
      setInputValue("");

      if (!isAcceptedAnswer) {
        setSubmissionIncorrect(true);
        if (incorrectCount + 1 >= INCORRECT_ANSWER_THRESHOLD) {
          setDisableSkipButton(false);
        }
        setIncorrectCount((prev) => ++prev);
        setTimeout(() => {
          setSubmissionIncorrect(false);
        }, 500);
        return null;
      }

      const updatedCheckedSubmissions = [
        ...checkedSubmissions,
        { ...matchedSubmission, checked: true },
      ];

      // Update recent submissions with last 3 answers
      const topCheckedSubmissions =
        updatedCheckedSubmissions.length > 3
          ? updatedCheckedSubmissions.slice(
              Math.max([...checkedSubmissions, matchedSubmission].length - 3, 1)
            )
          : updatedCheckedSubmissions;

      const updatedRecentSubmissions: Result[] = topCheckedSubmissions.map(
        (x) => {
          return {
            name: x.name,
            code: x.code,
            svgName: x.svgName,
            isHidden: false,
            isMissedResult: false,
          };
        }
      );

      // Update the remaining answers excluding most recent
      const updatedRemainingAnswers = remainingAnswers.filter(
        (answer) => answer.code !== matchedSubmission.code
      );

      if (updatedRemainingAnswers?.length) {
        setFlagDragItems(
          getRandomCollectionItems(updatedRemainingAnswers, 12).map(
            (c) => c.code
          )
        );
      }

      setScore(updatedCheckedSubmissions.length);
      setRecentSubmissions(updatedRecentSubmissions.reverse());
      setCheckedSubmissions(updatedCheckedSubmissions);
      setRemainingAnswers(updatedRemainingAnswers);

      setSubmissionCorrect(true);
      setTimeout(() => {
        setSubmissionCorrect(false);
      }, 500);

      if (updatedCheckedSubmissions.length === mapping.length) {
        handleGameStop();
      }
    },
    [acceptedFlag, checkedSubmissions, handleGameStop, mapping]
  );

  const onClearInput = (): void => {
    setHasError(false);
    setErrorMessage("");
    setInputValue("");
  };

  const handleSkipQuestion = (): void => {
    setFlagDragItems(
      getRandomCollectionItems(remainingAnswers, 12).map((c) => c.code)
    );
  };

  return (
    <>
      <Head>
        <title>{name} - GeoBuff</title>
      </Head>
      <Flex flex={1} direction="column">
        <Flex height="100%" minHeight="100%" direction="column" flex={1}>
          {isMobile && (
            <GameInputBanner
              type={type}
              maxScore={maxScore}
              verb={verb}
              time={time}
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

          <Flex grow={1} direction="column">
            {!isMobile && (
              <Box minHeight="100%">
                <Sidebar
                  heading={name}
                  quizId={id}
                  hasLeaderboard={hasLeaderboard}
                >
                  <Box>
                    <GameInputCard
                      type={type}
                      maxScore={maxScore}
                      time={time}
                      verb={verb}
                      hasFlags={hasFlags}
                      recents={recentSubmissions}
                      score={score}
                      expiryTimestamp={{ minutes, seconds }}
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
                      hasGroupings={hasGrouping}
                      hasFlags={hasFlags}
                    />
                  </Box>
                </Sidebar>
              </Box>
            )}

            {checkedSubmissions.length !== mapping.length && (
              <Flex
                direction="column"
                width="100%"
                height="100%"
                alignItems="center"
                flex="1"
              >
                <Flex
                  flex={{ base: "initial", lg: 1 }}
                  direction="column"
                  height="100%"
                  width="100%"
                  marginTop={10}
                >
                  <FlagDropZone
                    acceptedFlagName={acceptedFlag?.svgName}
                    hasGameStarted={hasGameStarted}
                    submissionCorrect={submissionCorrect}
                    submissionIncorrect={submissionIncorrect}
                    showSkipQuestion={
                      incorrectCount >= INCORRECT_ANSWER_THRESHOLD
                    }
                    isSkipButtonDisabled={disableSkipButton}
                    onSkipQuestion={handleSkipQuestion}
                  />
                </Flex>
                {!isMobile && (
                  <GameFlags
                    codes={flagDragItems}
                    onCheckSubmission={async (submission): Promise<void> =>
                      setCurrentSubmission(submission)
                    }
                  />
                )}
              </Flex>
            )}
          </Flex>

          {isMobile && (
            <GameFlagQuizBottomSheet
              checkedSubmissions={checkedSubmissions}
              mapping={mapping}
              hasLeaderboard={hasLeaderboard}
              id={id}
              name={name}
              hasGrouping={hasGrouping}
              hasFlags={hasFlags}
              flagDragItems={flagDragItems}
              hasGameStarted={hasGameStarted}
              hasGameStopped={hasGameStopped}
              hasGameRunOnce={hasGameRunOnce}
              onCheckSubmission={(submission): void =>
                setCurrentSubmission(submission)
              }
              onGameStart={handleGameStart}
              onGameStop={handleGameStop}
            />
          )}

          {hasGameRunOnce && hasGameStopped && !leaderboardEntrySubmitted && (
            <Box position="fixed" bottom="20px" right="20px">
              <Button onClick={onOpen}>
                <SolidChevronUp />
              </Button>
            </Box>
          )}
        </Flex>

        <GameOverModalContainer
          id={id}
          hasLeaderboard={hasLeaderboard}
          route={route}
          name={name}
          maxScore={maxScore}
          score={score}
          time={
            minutes === 0 && seconds === 0
              ? time
              : time - (seconds + minutes * 60)
          }
          isOpen={isOpen}
          onClose={onClose}
          isXPUpdated={isXPUpdated}
          setXPUpdated={setXPUpdated}
          setLeaderboardEntrySubmitted={setLeaderboardEntrySubmitted}
        />
      </Flex>
    </>
  );
};

export default GameFlagQuiz;
