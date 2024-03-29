import React, { FC, useCallback, useContext, useEffect, useState } from "react";

import {
  GameInputCard,
  GameSidebar,
  ResultsMap,
  SolidChevronUp,
} from "@geobuff/buff-ui/components";

import {
  Box,
  Button,
  Flex,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTimer } from "react-timer-hook";

import { AppContext } from "../../contexts/AppContext";
import { LanguageContext } from "../../contexts/LanguageContext";

import useWarnIfActiveGame from "../../hooks/useWarnIfActiveGame";

import axiosClient from "../../axios/axiosClient";
import { findSubmissionByCode } from "../../helpers/game";
import { groupMapping } from "../../helpers/mapping";
import {
  getRandomCollectionItem,
  getRandomCollectionItems,
} from "../../helpers/random";
import { FlagDetails } from "../../types/flag-details";
import { GameOverRedirect } from "../../types/game-over-redirect";
import { MappingEntry } from "../../types/mapping-entry";
import { Result } from "../../types/result";
import FlagDropZone from "../FlagDropZone/FlagDropZone";
import GameBannerButton from "../GameBannerButton";
import GameFlags from "../GameFlags/GameFlags";

const GameOverModalContainer = dynamic(() =>
  import("../../containers").then((mod) => mod.GameOverModalContainer)
);

const GameFlagQuizBottomSheet = dynamic(
  () => import("./GameFlagQuizBottomSheet")
);

const INCORRECT_ANSWER_THRESHOLD = 1;
const NUMBER_OF_FLAGS = 10;

const getRandomFlagItems = (entries: MappingEntry[]) =>
  getRandomCollectionItems(entries, NUMBER_OF_FLAGS).map(
    (entry: MappingEntry) => {
      return {
        code: entry.code,
        url: entry.flagUrl,
      };
    }
  );

interface Props {
  id?: number;
  time?: number;
  name?: string;
  typeId?: number;
  maxScore?: number;
  plural?: string;
  route?: string;
  hasLeaderboard?: boolean;
  hasFlags?: boolean;
  hasGrouping?: boolean;
  mapping?: MappingEntry[];
}

const GameFlagQuiz: FC<Props> = ({
  id = 0,
  time = 0,
  name = "",
  typeId = 0,
  maxScore = 0,
  plural = "",
  route = "",
  hasLeaderboard = false,
  hasFlags = false,
  hasGrouping = false,
  mapping = [],
}) => {
  const { t } = useContext(LanguageContext);

  const isMobile = useBreakpointValue({ base: true, lg: false });
  const router = useRouter();

  const { isNotchedIphone } = useContext(AppContext);

  const { status } = useSession();
  const isUserAuthenticated = status === "authenticated";

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [checkedSubmissions, setCheckedSubmissions] = useState<MappingEntry[]>(
    []
  );
  const [recentSubmissions, setRecentSubmissions] = useState<Result[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [hasGameRunOnce, setHasGameRunOnce] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [hasGameStopped, setHasGameStopped] = useState(false);
  const [isXPUpdated, setXPUpdated] = useState(false);
  const [leaderboardEntrySubmitted, setLeaderboardEntrySubmitted] =
    useState(false);
  const [timeRemaining, setTimeRemaining] = useState(new Date().getMinutes());
  const [acceptedFlag, setAcceptedFlag] = useState(null);
  const [remainingAnswers, setRemainingAnswers] = useState(() => mapping);
  const [currentSubmission, setCurrentSubmission] = useState("");
  const [submissionCorrect, setSubmissionCorrect] = useState(false);
  const [submissionIncorrect, setSubmissionIncorrect] = useState(false);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [disableSkipButton, setDisableSkipButton] = useState(true);

  const [flagDragItems, setFlagDragItems] = useState<FlagDetails[]>(() =>
    getRandomFlagItems(mapping)
  );
  useWarnIfActiveGame(hasGameStarted);

  useEffect(() => {
    if (score === 0 && isUserAuthenticated && router.query.data) {
      const data: GameOverRedirect = JSON.parse(router.query.data as string);
      axiosClient
        .get(`/tempscores/${data.tempScoreId}`)
        .then((response) => {
          const tempScore = response.data;

          const checkedSubmissions = mapping.filter((x) =>
            tempScore.results.includes(x.svgName)
          );

          const recentSubmissions: Result[] = mapping
            .filter((x) => tempScore.recents.includes(x.svgName))
            .map((x) => {
              return {
                name: x.name,
                code: x.code,
                flagUrl: x.flagUrl,
                svgName: x.svgName,
                isHidden: false,
                isMissedResult: false,
              };
            });

          setCheckedSubmissions(checkedSubmissions);
          setRecentSubmissions(recentSubmissions);

          setHasGameStarted(true);
          setScore(tempScore.score);
          restart(DateTime.now().plus({ seconds: time - tempScore.time }));
          handleGameStop();

          router.push(`/quiz/${route}`, undefined, { shallow: true });
        })
        .catch(() => {
          // Ignore invalid tempscore.
        });
    }
  }, [score, isUserAuthenticated, router.query]);

  useEffect(() => {
    if (currentSubmission && hasGameStarted) {
      checkSubmission(currentSubmission);
      setCurrentSubmission("");
    }
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
      const nextFlagObject = mapping.find((m) => m.code === nextFlagCode.code);
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
      const nextDragItems = getRandomFlagItems(mapping);
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
            flagUrl: x.flagUrl,
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
        setFlagDragItems(getRandomFlagItems(updatedRemainingAnswers));
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
        setFlagDragItems([]);
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
    setFlagDragItems(getRandomFlagItems(remainingAnswers));
  };

  return (
    <>
      <Head>
        <title>{name} - GeoBuff</title>
        <meta
          name="description"
          content={`Call yourself a flag enthusiast? Test your knowledge on ${name}!`}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4707219290548480"
          crossOrigin="anonymous"
        />
      </Head>
      <Flex flex={1} direction="column" backgroundColor="#276F86">
        <Flex height="100%" minHeight="100%" direction="column" flex={1}>
          {isMobile && (
            <GameBannerButton
              hasGameRunOnce={hasGameRunOnce}
              hasGameStarted={hasGameStarted}
              onGameStart={handleGameStart}
              onGameStop={handleGameStop}
            />
          )}

          <Flex grow={1} direction="column">
            {!isMobile && (
              <Box minHeight="100%">
                <GameSidebar
                  heading={name}
                  quizId={id}
                  hasLeaderboard={hasLeaderboard}
                  href={`/leaderboard?quizId=${id}`}
                >
                  <Box>
                    <GameInputCard
                      typeId={typeId}
                      maxScore={maxScore}
                      time={time}
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
                      inputPlaceholder={`${t.global.enter} ${plural}...`}
                      giveUpText={t.global.giveUp.toUpperCase()}
                      retryText={t.global.retry.toUpperCase()}
                      startText={t.global.start.toUpperCase()}
                      noResultsMessage={`${t.global.no} ${plural} ${t.global.toDisplay}`}
                      recentHeading={t.global.recent.toUpperCase()}
                      scoreHeading={t.global.score.toUpperCase()}
                      closeCircleLabel={t.global.closeCircle}
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
                </GameSidebar>
              </Box>
            )}

            {checkedSubmissions.length !== mapping.length && (
              <Flex
                direction="column"
                width="100%"
                height="100%"
                alignItems="center"
                flex="1"
                marginBottom={{ base: "260px", md: 0 }}
              >
                <Flex
                  flex={{ base: "initial", lg: 1 }}
                  direction="column"
                  height="100%"
                  width="100%"
                  marginTop={10}
                  justifyContent="center"
                >
                  <FlagDropZone
                    acceptedFlagName={acceptedFlag?.svgName}
                    subtitle={`${score} ${t.global.of} ${maxScore} ${plural}`}
                    hasGameStarted={hasGameStarted}
                    submissionCorrect={submissionCorrect}
                    submissionIncorrect={submissionIncorrect}
                    isSkipButtonDisabled={disableSkipButton}
                    onSkipQuestion={handleSkipQuestion}
                  />
                </Flex>
                {!isMobile && (
                  <GameFlags
                    flags={flagDragItems}
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
              hasGameStarted={hasGameStarted}
              hasGameStopped={hasGameStopped}
              isNotchedIphone={isNotchedIphone}
              expiryTimestamp={{ minutes, seconds }}
              timeRemaining={time}
              flagDragItems={flagDragItems}
              onCheckSubmission={(submission): void =>
                setCurrentSubmission(submission)
              }
            />
          )}

          {hasGameRunOnce && hasGameStopped && !leaderboardEntrySubmitted && (
            <>
              {isMobile ? (
                <Box position="fixed" top="130px" left="20px">
                  <Button onClick={onOpen}>
                    <SolidChevronUp marginRight={2} />
                    {t.global.gameDetails}
                  </Button>
                </Box>
              ) : (
                <Box position="fixed" bottom="20px" right="20px">
                  <Button onClick={onOpen}>
                    <SolidChevronUp marginRight={2} />
                    {t.global.gameDetails}
                  </Button>
                </Box>
              )}
            </>
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
          checkedSubmissions={checkedSubmissions}
          recentSubmissions={recentSubmissions}
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
