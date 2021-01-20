import React, { useState } from "react";

import CountriesOfTheWorldGame from "../../games/CountriesOfTheWorldGame";
import useCountries from "../../hooks/UseCountries";

const CountriesOfTheWorldGameContainer = () => {
  const { allCountries } = useCountries();

  const [checkedCountries, setCheckedCountries] = useState([]);
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

  // TODO: add error text for duplicate countries
  const handleChange = (countryName) => {
    const matchedCountry = findCountryByName(allCountries, countryName);
    const isChecked = findCountryByName(checkedCountries, countryName);

    if (matchedCountry && !isChecked) {
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

  return (
    <CountriesOfTheWorldGame
      checkedCountries={checkedCountries}
      inputValue={inputValue}
      onChange={handleChange}
      onChangeInputValue={handleChangeInputValue}
      recentCountries={recentCountries}
      score={score}
    />
  );
};

export default CountriesOfTheWorldGameContainer;
