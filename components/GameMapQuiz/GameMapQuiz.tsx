import React, {
  useState,
  useEffect,
  useCallback,
  FC,
  ChangeEvent,
  useContext,
} from "react";
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

import GameInputBanner from "../GameInputBanner";
import GameInputCard from "../GameInputCard";
import Sidebar from "../Sidebar";
import ResultsMap from "../ResultsMap";
import GameMap from "../GameMap";

import GameOverModalContainer from "../../containers/GameOverModalContainer";

import SolidChevronUp from "../../Icons/SolidChevronUp";
import SolidChevronDown from "../../Icons/SolidChevronDown";

import useWarnIfActiveGame from "../../hooks/useWarnIfActiveGame";

import axiosClient from "../../axios/axiosClient";

import { groupMapping } from "../../helpers/mapping";

import {
  findSubmissionByNames,
  findSubmissionsByPrefixes,
} from "../../helpers/game";
import { Mapping } from "../../types/mapping";
import { SVGBase } from "../../types/svg-base";
import { Result } from "../../types/result";
import GameMapQuizBottomSheet from "./GameMapQuizBottomSheet";
import { GameOverRedirect } from "../../types/game-over-redirect";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const pathSelectedStyle = {
  fill: "#27ae60",
};

interface Props {
  time?: number;
  name?: string;
  type?: number;
  maxScore?: number;
  verb?: string;
  route?: string;
  id?: number;
  hasLeaderboard?: boolean;
  hasFlags?: boolean;
  hasGrouping?: boolean;
  mapping?: Mapping[];
  map?: SVGBase;
}

const GameMapQuiz: FC<Props> = ({
  time = 0,
  name = "",
  type = 0,
  maxScore = 0,
  verb = "",
  route = "",
  id = 0,
  hasLeaderboard = false,
  hasFlags = false,
  hasGrouping = false,
  mapping = [],
  map = null,
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

  useWarnIfActiveGame(hasGameStarted);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });

  const quizDateTime = useCallback(
    () => DateTime.now().plus({ seconds: time }),
    [time]
  );

  useEffect(() => {
    if (!isUserLoading && user && router.query.data) {
      const data: GameOverRedirect = JSON.parse(router.query.data as string);
      axiosClient
        .get(`/tempscores/${data.tempScoreId}`)
        .then((response) => {
          const tempScore = response.data;
          setHasGameStarted(true);
          setScore(tempScore.score);
          restart(DateTime.now().plus({ seconds: time - tempScore.time }));
          handleGameStop();
        })
        .catch(() => {
          //Ignore invalid tempscore.
        });
    }
  }, [isUserLoading, user, router.query]);

  useEffect(() => {
    if (hasGameStarted) {
      restart(quizDateTime());
      if (!hasGameRunOnce) {
        setHasGameRunOnce(true);
      }
    }
  }, [timeRemaining, hasGameStarted]);

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

  const handleGameStart = (): void => {
    map.paths.map((x) => {
      x.style = {};
      return x;
    });

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;
    setInputValue(value);

    if (value?.length >= 2) {
      handleChangeDebounced(value);
    }
  };

  const handleChangeDebounced = debounce(30, (value: string) =>
    checkSubmission(value)
  );

  const checkSubmission = (value: string): void => {
    const submission = value.trim();

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

      map.paths
        .filter(
          (x) =>
            x.name.toLowerCase() === matchedSubmission.svgName.toLowerCase()
        )
        .map((x) => {
          x.style = pathSelectedStyle;
          return x;
        });

      setScore(updatedCheckedSubmissions.length);
      setRecentSubmissions(updatedRecentSubmissions.reverse());
      setCheckedSubmissions(updatedCheckedSubmissions);

      if (updatedCheckedSubmissions.length === mapping.length) {
        handleGameStop();
      }
    }
  };

  const onClearInput = (): void => {
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
        <title>{name} - GeoBuff</title>
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
            onChange={handleChange}
            onClearInput={onClearInput}
          />
        )}

        <Flex grow={1} direction={{ base: "column", md: "row" }}>
          {!shouldDisplayOnMobile && (
            <Fade in>
              <Box minHeight="100%">
                <Sidebar
                  heading={name}
                  quizId={id}
                  hasLeaderboard={hasLeaderboard}
                >
                  <Flex direction="column" height="100%">
                    <GameInputCard
                      type={type}
                      maxScore={maxScore}
                      time={time}
                      verb={verb}
                      hasFlags={hasFlags}
                      recents={recentSubmissions}
                      score={score}
                      expiryTimestamp={{ seconds, minutes }}
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
                      hasGroupings={hasGrouping}
                      hasFlags={hasFlags}
                    />
                  </Flex>
                </Sidebar>
              </Box>
            </Fade>
          )}

          <Fade in>
            <GameMap map={map} showTooltip={!hasGameStarted} />
          </Fade>

          {shouldDisplayOnMobile && (
            <GameMapQuizBottomSheet
              hasLeaderboard={hasLeaderboard}
              id={id}
              name={name}
              verb={verb}
              hasFlags={hasFlags}
              hasGrouping={hasGrouping}
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
        </>
      )}
    </>
  );
};

export default GameMapQuiz;
