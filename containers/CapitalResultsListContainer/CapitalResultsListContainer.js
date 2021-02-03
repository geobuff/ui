import React from "react";
import PropTypes from "prop-types";
import useCapitals from "../../hooks/UseCapitals";

import CountryResultsList from "../../components/CountryResultsList/CountryResultsList";
import ResultsListPlaceholder from "../../placeholders/ResultsListPlaceholder/ResultsListPlaceholder";

const CapitalResultsListContainer = ({ checkedCapitals }) => {
  const { capitalsByContinent, isPending } = useCapitals();

  if (isPending) {
    return <ResultsListPlaceholder noOfLines={197} />;
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
