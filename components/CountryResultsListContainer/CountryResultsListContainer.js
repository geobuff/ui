import React from "react";
import PropTypes from "prop-types";
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

CountryResultsListContainer.propTypes = {
  checkedCountries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};

CountryResultsListContainer.defaultProps = {
  checkedCountries: [],
};

export default CountryResultsListContainer;
