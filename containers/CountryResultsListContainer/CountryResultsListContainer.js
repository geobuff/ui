import React from "react";
import PropTypes from "prop-types";
import useCountries from "../../hooks/UseCountries";

import ResultsMap from "../../components/ResultsMap/ResultsMap";
import ResultsListPlaceholder from "../../placeholders/ResultsListPlaceholder/ResultsListPlaceholder";

const CountryResultsListContainer = ({ quiz, checkedCountries }) => {
  const { countriesByContinent, isPending } = useCountries();

  if (isPending) {
    return <ResultsListPlaceholder noOfLines={quiz.maxScore} />;
  }

  return (
    <ResultsMap
      quiz={quiz}
      results={checkedCountries}
      map={countriesByContinent}
    />
  );
};

CountryResultsListContainer.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxScore: PropTypes.number,
    time: PropTypes.number,
    imageUrl: PropTypes.string,
    verb: PropTypes.string,
    apiPath: PropTypes.string,
    hasLeaderboard: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
  checkedCountries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};

CountryResultsListContainer.defaultProps = {
  quiz: {},
  checkedCountries: [],
};

export default CountryResultsListContainer;
