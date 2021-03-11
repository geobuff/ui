import React, { useState } from "react";
import PropTypes from "prop-types";

import UKCountiesGame from "../../games/UKCountiesGame";
import useQuiz from "../../hooks/UseQuiz";
import useMapping from "../../hooks/UseMapping";

const UKCountiesGameContainer = ({ id }) => {
  const { data: allCounties, loadingCounties } = useMapping(id);
  const { quiz, loadingQuiz } = useQuiz(id);

  const [checkedCounties, setCheckedCounties] = useState([]);
  const [recentCounties, setRecentCounties] = useState([]);
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState();
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const findCountyByName = (collection, countyName) =>
    collection?.find(
      (county) => county.name.toLowerCase() === countyName.toLowerCase()
    );

  const findCountiesByPrefixes = (collection, countyName) =>
    collection.filter((county) =>
      county.prefixes.includes(countyName.toLowerCase())
    );

  const handleChangeInputValue = (value) => {
    setInputValue(value);
  };

  const handleChange = (countyName) => {
    if (!countyName) {
      setHasError(false);
      setErrorMessage("");
    }

    const matchedPrefixes = findCountiesByPrefixes(allCounties, countyName);
    const isChecked = findCountyByName(checkedCounties, countyName);

    if (isChecked && matchedPrefixes.length > 0) {
      return;
    }

    const matchedCounty = findCountyByName(allCounties, countyName);

    if (matchedCounty && isChecked) {
      setHasError(true);
      setErrorMessage(`${matchedCounty.svgName} has already been answered!`);
    }

    if (matchedCounty && !isChecked) {
      setErrorMessage("");
      setHasError(false);
      setInputValue("");
      const updatedCheckedCounties = [
        ...checkedCounties,
        { ...matchedCounty, checked: true },
      ];

      const updatedRecentCounties =
        updatedCheckedCounties.length > 3
          ? updatedCheckedCounties.slice(
              Math.max([...checkedCounties, matchedCounty].length - 3, 1)
            )
          : updatedCheckedCounties;

      setScore(updatedCheckedCounties.length);
      setRecentCounties(updatedRecentCounties.reverse());
      setCheckedCounties(updatedCheckedCounties);
    }
  };

  const handleClearInput = () => {
    setHasError(false);
    setErrorMessage("");
    setInputValue("");
  };

  const resetGame = () => {
    setCheckedCounties([]);
    setRecentCounties([]);
    setScore(0);
  };

  if (loadingCounties || loadingQuiz) {
    return null;
  }

  return (
    <UKCountiesGame
      quiz={quiz}
      checkedCounties={checkedCounties}
      recentCounties={recentCounties}
      score={score}
      errorMessage={errorMessage}
      hasError={hasError}
      inputValue={inputValue}
      onChange={handleChange}
      onChangeInputValue={handleChangeInputValue}
      onClearInput={handleClearInput}
      resetGame={resetGame}
    />
  );
};

UKCountiesGameContainer.propTypes = {
  id: PropTypes.number,
};

export default UKCountiesGameContainer;
