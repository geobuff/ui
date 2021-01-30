import React, { useState } from "react";

import USStatesGame from "../../games/USStatesGame";
import useStates from "../../hooks/UseStates";

const USStatesGameContainer = () => {
  const { allStates } = useStates();

  const [checkedStates, setCheckedStates] = useState([]);
  const [recentStates, setRecentStates] = useState([]);
  const [score, setScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);
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

      const updatedRecentCountries =
        updatedCheckedStates.length > 3
          ? updatedCheckedStates.slice(
              Math.max([...checkedStates, matchedState].length - 3, 1)
            )
          : updatedCheckedStates;

      setScore(updatedCheckedStates.length);
      setRecentStates(updatedRecentCountries.reverse());
      setCheckedStates(updatedCheckedStates);
    }
  };

  const handleClearInput = () => {
    setHasError(false);
    setErrorMessage("");
    setInputValue("");
  };

  return (
    <USStatesGame
      checkedCountries={checkedStates}
      recentCountries={recentStates}
      score={score}
      errorMessage={errorMessage}
      hasError={hasError}
      inputValue={inputValue}
      onChange={handleChange}
      onChangeInputValue={handleChangeInputValue}
      onClearInput={handleClearInput}
    />
  );
};

export default USStatesGameContainer;
