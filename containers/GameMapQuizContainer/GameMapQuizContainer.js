import React, { useState } from "react";
import PropTypes from "prop-types";

import GameMapQuiz from "../../components/GameMapQuiz";

import useQuiz from "../../hooks/UseQuiz";
import { getMapById } from "../../helpers/quizzes";
import { flattenCountries } from "../../helpers/game";

const GameMapQuizContainer = ({ id }) => {
  const { quiz, loading: loadingQuiz, data } = useQuiz(id);

  const submissions = flattenCountries(data);

  const [checkedSubmissions, setCheckedSubmissions] = useState([]);

  const [recentSubmissions, setRecentSubmissions] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const [hasError, setHasError] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const [score, setScore] = useState(0);

  const findSubmissionByName = (collection, submissionName) =>
    collection?.find(
      (submission) =>
        submission.name.toLowerCase() === submissionName.toLowerCase()
    );

  const findSubmissionsByPrefixes = (collection, submissionName) =>
    collection.filter((submission) =>
      submission.prefixes.includes(submissionName.toLowerCase())
    );

  const handleChangeInputValue = (value) => {
    setInputValue(value);
  };

  const handleChange = (countryName) => {
    if (!countryName) {
      setHasError(false);
      setErrorMessage("");
    }

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

  const handleClearInput = () => {
    setHasError(false);
    setErrorMessage("");
    setInputValue("");
  };

  const resetGame = () => {
    setCheckedSubmissions([]);
    setRecentSubmissions([]);
    setScore(0);
  };

  if (loadingQuiz) {
    return null;
  }

  return (
    <GameMapQuiz
      quiz={quiz}
      map={getMapById(id)}
      checkedCountries={checkedSubmissions}
      errorMessage={errorMessage}
      hasError={hasError}
      inputValue={inputValue}
      onChange={handleChange}
      onChangeInputValue={handleChangeInputValue}
      onClearInput={handleClearInput}
      recentCountries={recentSubmissions}
      score={score}
      resetGame={resetGame}
    />
  );
};

GameMapQuizContainer.propTypes = {
  id: PropTypes.number,
};

export default GameMapQuizContainer;
