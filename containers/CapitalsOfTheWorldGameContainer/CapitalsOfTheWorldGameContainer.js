import React, { useState } from "react";

import CapitalsOfTheWorldGame from "../../games/CapitalsOfTheWorldGame";
import useCapitals from "../../hooks/UseCapitals";

const CapitalsOfTheWorldGameContainer = () => {
  const { allCapitals } = useCapitals();

  const [checkedCapitals, setCheckedCapitals] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [recentCapitals, setRecentCapitals] = useState([]);
  const [score, setScore] = useState(0);

  const findCapitalByName = (collection, capitalName) =>
    collection?.find(
      (capital) => capital.name.toLowerCase() === capitalName.toLowerCase()
    );

  const findCapitalsByPrefixes = (collection, capitalName) =>
    collection.filter((capital) =>
      capital.prefixes.includes(capitalName.toLowerCase())
    );

  const handleChangeInputValue = (value) => {
    setInputValue(value);
  };

  const handleChange = (capitalName) => {
    if (!capitalName) {
      setHasError(false);
      setErrorMessage("");
    }

    const matchedPrefixes = findCapitalsByPrefixes(allCapitals, capitalName);
    const isChecked = findCapitalByName(checkedCapitals, capitalName);

    if (isChecked && matchedPrefixes.length > 0) {
      return;
    }

    const matchedCapital = findCapitalByName(allCapitals, capitalName);

    if (matchedCapital && isChecked) {
      setHasError(true);
      setErrorMessage(`${matchedCapital.svgName} has already been answered!`);
    }

    if (matchedCapital && !isChecked) {
      setErrorMessage("");
      setHasError(false);
      setInputValue("");
      const updatedCheckedCapitals = [
        ...checkedCapitals,
        { ...matchedCapital, checked: true },
      ];

      const updatedRecentCapitals =
        updatedCheckedCapitals.length > 3
          ? updatedCheckedCapitals.slice(
              Math.max([...checkedCapitals, matchedCapital].length - 3, 1)
            )
          : updatedCheckedCapitals;

      setScore(updatedCheckedCapitals.length);
      setRecentCapitals(updatedRecentCapitals.reverse());
      setCheckedCapitals(updatedCheckedCapitals);
    }
  };

  const handleClearInput = () => {
    setHasError(false);
    setErrorMessage("");
    setInputValue("");
  };

  return (
    <CapitalsOfTheWorldGame
      checkedCapitals={checkedCapitals}
      errorMessage={errorMessage}
      hasError={hasError}
      inputValue={inputValue}
      onChange={handleChange}
      onChangeInputValue={handleChangeInputValue}
      onClearInput={handleClearInput}
      recentCapitals={recentCapitals}
      score={score}
    />
  );
};

export default CapitalsOfTheWorldGameContainer;
