import React, { useState } from "react";

import CountriesOfTheWorldGame from "../../games/CountriesOfTheWorldGame";
import useCountries from "../../hooks/UseCountries";

const CountriesOfTheWorldGameContainer = () => {
  const { allCountries, isPending } = useCountries();

  const [checkedCountries, setCheckedCountries] = useState([]);
  const [recentCountries, setRecentCountries] = useState([]);

  const [score, setScore] = useState(0);

  const findCountryByName = (collection, countryName) =>
    collection?.find(
      (country) => country.name.toLowerCase() === countryName.toLowerCase()
    );

  // TODO: add error text for duplicate countries
  const handleChange = (countryName) => {
    const matchedCountry = findCountryByName(allCountries, countryName);

    const isChecked = findCountryByName(checkedCountries, countryName);

    if (matchedCountry && !isChecked) {
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
      isLoading={isPending}
      onChange={handleChange}
      recentCountries={recentCountries}
      score={score}
    />
  );
};

export default CountriesOfTheWorldGameContainer;
