import React, { useState } from "react";

import CountriesOfTheWorldGame from "../../games/CountriesOfTheWorldGame";
import useCountries from "../../hooks/UseCountries";

const CountriesOfTheWorldGameContainer = () => {
  const { allCountries, isPending } = useCountries();

  const [checkedCountries, setCheckedCountries] = useState([]);

  const [score, setScore] = useState(0);

  const handleChange = (countryName) => {
    const selectedCountry = allCountries.find(
      (country) => country?.name.toLowerCase() === countryName.toLowerCase()
    );

    if (selectedCountry) {
      setCheckedCountries(() => [
        ...checkedCountries,
        { ...selectedCountry, checked: true },
      ]);
      setScore([...checkedCountries, selectedCountry].length);
    }
  };

  return (
    <CountriesOfTheWorldGame
      checkedCountries={checkedCountries}
      isLoading={isPending}
      onChange={handleChange}
      score={score}
    />
  );
};

export default CountriesOfTheWorldGameContainer;
