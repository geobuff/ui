import React, { useState } from "react";
import PropTypes from "prop-types";

import GameMapQuiz from "../../components/GameMapQuiz";

import useCountries from "../../hooks/UseCountries";
import useQuiz from "../../hooks/UseQuiz";
import { getMapById } from "../../helpers/quizzes";

const GameMapQuizContainer = ({ id }) => {
  const { allCountries, loadingCountries } = useCountries();

  const { quiz, loadingQuiz } = useQuiz(id);

  const [checkedCountries, setCheckedCountries] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [recentCountries, setRecentCountries] = useState([]);
  const [score, setScore] = useState(0);

  const findCountryByName = (collection, countryName) =>
    collection?.find(
      (country) => country.name.toLowerCase() === countryName.toLowerCase()
    );

  const findCountriesByPrefixes = (collection, countryName) =>
    collection.filter((country) =>
      country.prefixes.includes(countryName.toLowerCase())
    );

  const handleChangeInputValue = (value) => {
    setInputValue(value);
  };

  const handleChange = (countryName) => {
    if (!countryName) {
      setHasError(false);
      setErrorMessage("");
    }

    const matchedPrefixes = findCountriesByPrefixes(allCountries, countryName);
    const isChecked = findCountryByName(checkedCountries, countryName);

    if (isChecked && matchedPrefixes.length > 0) {
      return;
    }

    const matchedCountry = findCountryByName(allCountries, countryName);

    if (matchedCountry && isChecked) {
      setHasError(true);
      setErrorMessage(`${matchedCountry.svgName} has already been answered!`);
    }

    if (matchedCountry && !isChecked) {
      setErrorMessage("");
      setHasError(false);
      setInputValue("");
      const updatedCheckedCountries = [
        ...checkedCountries,
        { ...matchedCountry, checked: true },
      ];

      const updatedRecentCountries =
        updatedCheckedCountries.length > 3
          ? updatedCheckedCountries.slice(
              Math.max([...checkedCountries, matchedCountry].length - 3, 1)
            )
          : updatedCheckedCountries;

      setScore(updatedCheckedCountries.length);
      setRecentCountries(updatedRecentCountries.reverse());
      setCheckedCountries(updatedCheckedCountries);
    }
  };

  const handleClearInput = () => {
    setHasError(false);
    setErrorMessage("");
    setInputValue("");
  };

  const resetGame = () => {
    setCheckedCountries([]);
    setRecentCountries([]);
    setScore(0);
  };

  if (loadingCountries || loadingQuiz) {
    return null;
  }

  return (
    <GameMapQuiz
      quiz={quiz}
      map={getMapById(id)}
      checkedCountries={checkedCountries}
      errorMessage={errorMessage}
      hasError={hasError}
      inputValue={inputValue}
      onChange={handleChange}
      onChangeInputValue={handleChangeInputValue}
      onClearInput={handleClearInput}
      recentCountries={recentCountries}
      score={score}
      resetGame={resetGame}
    />
  );
};

GameMapQuizContainer.propTypes = {
  id: PropTypes.number,
};

export default GameMapQuizContainer;
