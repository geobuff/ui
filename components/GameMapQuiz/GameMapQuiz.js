import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { debounce } from "debounce";

import { Box, Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";

import CountryResultsListContainer from "../../containers/CountryResultsListContainer";
import GameBottomSheetModal from "../GameBottomSheetModal";
import GameInputBanner from "../GameInputBanner";
import GameInputCard from "../GameInputCard";
import Sidebar from "../Sidebar";

import GameOverModalContainer from "../../containers/GameOverModalContainer";

import { timeFifteenMinutes } from "../../helpers/time";
import { useTimer } from "react-timer-hook";
import GameMap from "../GameMap/GameMap";

const GameMapQuiz = ({
  quiz,
  map,
  submissions,
  // checkedSubmissions,
  // recentSubmissions,
  // score,
  // errorMessage,
  // hasError,
  // inputValue,
  // onChange,
  // onChangeInputValue,
  onClearInput,
  resetGame,
}) => {
  const [checkedSubmissions, setCheckedSubmissions] = useState([]);

  const [recentSubmissions, setRecentSubmissions] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const [hasError, setHasError] = useState(false);

  const [score, setScore] = useState(0);

  const [inputValue, setInputValue] = useState("");

  const [hasGameStarted, setHasGameStarted] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(new Date().getMinutes());

  const [time, setTime] = useState(0);

  // TODO: km - Remove state
  const [gameStartText, setGameStartText] = useState("START");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });

  const { seconds, minutes, restart, pause } = useTimer({
    timeRemaining,
  });

  // const handleDebounceChange = useCallback(debounce(handleChange, 30), [
  //   handleChange,
  // ]);

  const findSubmissionByName = (collection, submissionName) =>
    collection?.find(
      (submission) =>
        submission.name.toLowerCase() === submissionName.toLowerCase()
    );

  const findSubmissionsByPrefixes = (collection, submissionName) =>
    collection.filter((submission) =>
      submission.prefixes.includes(submissionName.toLowerCase())
    );

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

  const handleChange = (event) => {
    const countryName = event.currentTarget.value;

    setInputValue(countryName);

    if (!countryName) {
      setHasError(false);
      setErrorMessage("");
    }

    console.log(countryName, "countryName");

    const matchedPrefixes = findSubmissionsByPrefixes(submissions, countryName);
    const isChecked = findSubmissionByName(checkedSubmissions, countryName);

    if (isChecked && matchedPrefixes.length > 0) {
      return;
    }

    const matchedSubmission = findSubmissionByName(submissions, countryName);

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

      const updatedCheckedCountries = [
        ...checkedSubmissions,
        { ...matchedSubmission, checked: true },
      ];

      const updatedRecentCountries =
        updatedCheckedCountries.length > 3
          ? updatedCheckedCountries.slice(
              Math.max([...checkedSubmissions, matchedSubmission].length - 3, 1)
            )
          : updatedCheckedCountries;

      setScore(updatedCheckedCountries.length);
      setRecentSubmissions(updatedRecentCountries.reverse());
      setCheckedSubmissions(updatedCheckedCountries);
    }
  };

  const handleGameStart = () => {
    resetGame();
    restart(timeFifteenMinutes());
    setTimeRemaining(timeFifteenMinutes());
    setHasGameStarted(true);
  };

  const handleGameStop = () => {
    pause();
    // TODO: Update 900 to be a quiz constant
    setTime(900 - (seconds + minutes * 60));
    setHasGameStarted(false);
    onOpen();
    if (gameStartText === "START") {
      setGameStartText("RETRY");
    }
  };

  return (
    <Box width="100%" height="100vh" backgroundColor="#276F86">
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
                  recents={recentSubmissions}
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
                <CountryResultsListContainer
                  quiz={quiz}
                  checkedCountries={checkedSubmissions}
                />
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
            checked={checkedSubmissions}
            recents={recentSubmissions}
            hasGameStarted={hasGameStarted}
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
  // TODO: proptypes
  submissions: PropTypes.any,
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
  checkedSubmissions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  recentSubmissions: PropTypes.arrayOf(
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
  map: PropTypes.any,
};

GameMapQuiz.defaultProps = {
  submissions: [],
  quiz: {},
  checkedSubmissions: [],
  recentSubmissions: [],
  score: 0,
  errorMessage: "",
  hasError: false,
  inputValue: "",
  onChange: () => {},
  onChangeInputValue: () => {},
  onClearInput: () => {},
  resetGame: () => {},
  map: null,
};

export default GameMapQuiz;
