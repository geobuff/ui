import React from "react";
import useCountries from "../../hooks/UseCountries";

import CountryResultsList from "../CountryResultsList/CountryResultsList";
import CountryResultsListPlaceholder from "../CountryResultsListPlaceholder/CountryResultsListPlaceholder";

const CountryResultsListContainer = ({ checkedCountries }) => {
  const { countriesByContinent, isPending } = useCountries();

  if (isPending) {
    return <CountryResultsListPlaceholder />;
  }

  return (
    <CountryResultsList
      checkedCountries={checkedCountries}
      countriesByContinent={countriesByContinent}
    />
  );
};

export default CountryResultsListContainer;
