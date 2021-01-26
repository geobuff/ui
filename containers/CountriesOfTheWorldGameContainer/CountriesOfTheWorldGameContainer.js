import React, { useState } from "react";

import CountriesOfTheWorldGame from "../../games/CountriesOfTheWorldGame";
import useCountries from "../../hooks/UseCountries";

const CountriesOfTheWorldGameContainer = () => {
  const { allCountries } = useCountries();

  const [checkedCountries, setCheckedCountries] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [recentCountries, setRecentCountries] = useState([]);
  const [score, setScore] = useState(0);

  const findCountryByName = (collection, countryName) =>
    collection?.find(
      (country) => country.name.toLowerCase() === countryName.toLowerCase()
    );

  const handleChangeInputValue = (value) => {
    setInputValue(value);
  };

  const handleChange = (countryName) => {
    if (!countryName) {
      setHasError(false);
      setErrorMessage("");
    }

    const matchedCountry = findCountryByName(allCountries, countryName);
    const isChecked = findCountryByName(checkedCountries, countryName);

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

  return (
    <CountriesOfTheWorldGame
      checkedCountries={checkedCountries}
      errorMessage={errorMessage}
      hasError={hasError}
      inputValue={inputValue}
      onChange={handleChange}
      onChangeInputValue={handleChangeInputValue}
      onClearInput={handleClearInput}
      recentCountries={recentCountries}
      score={score}
    />
  );
};

export default CountriesOfTheWorldGameContainer;
