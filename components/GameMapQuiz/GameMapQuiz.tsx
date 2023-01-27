import React, {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  GameInputBanner,
  GameInputCard,
  GameSidebar,
  ResultsMap,
  SVGBase,
  SolidChevronDown,
  SolidChevronUp,
} from "@geobuff/buff-ui/components";

import {
  Box,
  Button,
  Fade,
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
import { debounce } from "throttle-debounce";

import { LanguageContext } from "../../contexts/LanguageContext";

import useWarnIfActiveGame from "../../hooks/useWarnIfActiveGame";

import axiosClient from "../../axios/axiosClient";
import {
  findSubmissionByNames,
  findSubmissionsByPrefixes,
} from "../../helpers/game";
import {
  clearMapFill,
  getPathSelectedFill,
  initializeMap,
  updateMapOnGameStop,
  updateMapOnSuccessfulSubmission,
} from "../../helpers/map";
import { groupMapping } from "../../helpers/mapping";
import { GameOverRedirect } from "../../types/game-over-redirect";
import { MappingEntry } from "../../types/mapping-entry";
import { Result } from "../../types/result";
import GameMap from "../GameMap";

const GameMapQuizBottomSheet = dynamic(
  () => import("./GameMapQuizBottomSheet")
);

const GameOverModalContainer = dynamic(() =>
  import("../../containers").then((mod) => mod.GameOverModalContainer)
);

interface Props {
  time?: number;
  name?: string;
  typeId?: number;
  maxScore?: number;
  plural?: string;
  route?: string;
  id?: number;
  hasLeaderboard?: boolean;
  hasFlags?: boolean;
  hasGrouping?: boolean;
  mapping?: MappingEntry[];
  map?: SVGBase;
  mapClassName?: string;
}

const GameMapQuiz: FC<Props> = ({
  time = 0,
  name = "",
  typeId = 0,
  maxScore = 0,
  plural = "",
  route = "",
  id = 0,
  hasLeaderboard = false,
  hasFlags = false,
  hasGrouping = false,
  mapping = [],
  map = null,
  mapClassName = "",
}) => {
  const { t } = useContext(LanguageContext);

  const router = useRouter();
  const { status } = useSession();
  const isUserAuthenticated = status === "authenticated";

  const pathSelectedFill = getPathSelectedFill(mapClassName);
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

  useWarnIfActiveGame(hasGameStarted);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });

  const quizDateTime = useCallback(
    () => DateTime.now().plus({ seconds: time }),
    [time]
  );

  useEffect(() => {
    initializeMap(map);
  }, []);

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
          //Ignore invalid tempscore.
        });
    }
  }, [score, isUserAuthenticated, router.query]);

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
    clearMapFill(map, mapClassName);
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
    onOpen();
    setHasGameStarted(false);
    setHasGameStopped(true);
    updateMapOnGameStop(map, mapClassName);
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
        `${matchedSubmission.svgName} ${t.global.hasAlreadyBeenAnswered}`
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
            flagUrl: x.flagUrl,
            svgName: x.svgName,
            isHidden: false,
            isMissedResult: false,
          };
        }
      );

      updateMapOnSuccessfulSubmission(
        map,
        mapClassName,
        matchedSubmission.svgName.toLowerCase(),
        pathSelectedFill
      );

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

  return (
    <>
      <Head>
        <title>{name} - GeoBuff</title>
        <meta
          name="description"
          content={`Rate yourself as a budding cartographer? Test your knowledge on ${name}!`}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4707219290548480"
          crossOrigin="anonymous"
        />
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
            typeId={typeId}
            plural={plural}
            time={time}
            errorMessage={errorMessage}
            expiryTimestamp={{ seconds, minutes }}
            hasError={hasError}
            hasGameStarted={hasGameStarted}
            hasGameStopped={hasGameStopped}
            inputValue={inputValue}
            scoreLabel={`${score} ${t.global.of} ${maxScore} ${plural}`}
            inputPlaceholder={`${t.global.enter} ${plural}...`}
            closeCircleLabel={t.global.closeCircle}
            onChange={handleChange}
            onClearInput={onClearInput}
          />
        )}

        <Flex grow={1} direction={{ base: "column", md: "row" }}>
          {!shouldDisplayOnMobile && (
            <Fade in>
              <Box minHeight="100%">
                <GameSidebar
                  heading={name}
                  quizId={id}
                  hasLeaderboard={hasLeaderboard}
                  href={`/leaderboard?quizId=${id}`}
                >
                  <Flex direction="column" height="100%">
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
                </GameSidebar>
              </Box>
            </Fade>
          )}

          <Fade in>
            <GameMap
              map={map}
              showTooltip={!hasGameStarted}
              mapClassName={mapClassName}
            />
          </Fade>

          {shouldDisplayOnMobile && (
            <GameMapQuizBottomSheet
              hasLeaderboard={hasLeaderboard}
              id={id}
              name={name}
              plural={plural}
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
                {t.global.gameDetails}
                <SolidChevronUp marginLeft={2} />
              </Button>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default GameMapQuiz;
