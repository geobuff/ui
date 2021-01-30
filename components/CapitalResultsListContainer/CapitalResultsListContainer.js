import React from "react";
import PropTypes from "prop-types";
import useCapitals from "../../hooks/UseCapitals";

import CountryResultsList from "../CountryResultsList/CountryResultsList";
import CountryResultsListPlaceholder from "../CountryResultsListPlaceholder/CountryResultsListPlaceholder";

const CapitalResultsListContainer = ({ checkedCapitals }) => {
  const { capitalsByContinent, isPending } = useCapitals();

  if (isPending) {
    return <CountryResultsListPlaceholder />;
  }

  return (
    <CountryResultsList
      checkedCountries={checkedCapitals}
      countriesByContinent={capitalsByContinent}
      verb="capitals"
    />
  );
};

CapitalResultsListContainer.propTypes = {
  checkedCapitals: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};

CapitalResultsListContainer.defaultProps = {
  checkedCapitals: [],
};

export default CapitalResultsListContainer;
