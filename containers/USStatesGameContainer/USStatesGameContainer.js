import React, { useState } from "react";
import PropTypes from "prop-types";

import USStatesGame from "../../games/USStatesGame";
import useMapping from "../../hooks/UseMapping";
import useQuiz from "../../hooks/UseQuiz";

const USStatesGameContainer = ({ id }) => {
  const { data: allStates, loadingStates } = useMapping(id);
  const { quiz, loadingQuiz } = useQuiz(id);

  const [checkedStates, setCheckedStates] = useState([]);
  const [recentStates, setRecentStates] = useState([]);
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState();
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const findStateByName = (collection, stateName) =>
    collection?.find(
      (state) => state.name.toLowerCase() === stateName.toLowerCase()
    );

  const findStatesByPrefixes = (collection, stateName) =>
    collection.filter((state) =>
      state.prefixes.includes(stateName.toLowerCase())
    );

  const handleChangeInputValue = (value) => {
    setInputValue(value);
  };

  const handleChange = (stateName) => {
    if (!stateName) {
      setHasError(false);
      setErrorMessage("");
    }

    const matchedPrefixes = findStatesByPrefixes(allStates, stateName);
    const isChecked = findStateByName(checkedStates, stateName);

    if (isChecked && matchedPrefixes.length > 0) {
      return;
    }

    const matchedState = findStateByName(allStates, stateName);

    if (matchedState && isChecked) {
      setHasError(true);
      setErrorMessage(`${matchedState.svgName} has already been answered!`);
    }

    if (matchedState && !isChecked) {
      setErrorMessage("");
      setHasError(false);
      setInputValue("");
      const updatedCheckedStates = [
        ...checkedStates,
        { ...matchedState, checked: true },
      ];

      const updatedRecentStates =
        updatedCheckedStates.length > 3
          ? updatedCheckedStates.slice(
              Math.max([...checkedStates, matchedState].length - 3, 1)
            )
          : updatedCheckedStates;

      setScore(updatedCheckedStates.length);
      setRecentStates(updatedRecentStates.reverse());
      setCheckedStates(updatedCheckedStates);
    }
  };

  const handleClearInput = () => {
    setHasError(false);
    setErrorMessage("");
    setInputValue("");
  };

  const resetGame = () => {
    setCheckedStates([]);
    setRecentStates([]);
    setScore(0);
  };

  if (loadingStates || loadingQuiz) {
    return null;
  }

  return (
    <USStatesGame
      quiz={quiz}
      checkedStates={checkedStates}
      recentStates={recentStates}
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

USStatesGameContainer.propTypes = {
  id: PropTypes.number,
};

export default USStatesGameContainer;
