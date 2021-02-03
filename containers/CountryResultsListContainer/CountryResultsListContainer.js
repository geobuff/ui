import React from "react";
import PropTypes from "prop-types";
import useCountries from "../../hooks/UseCountries";

import ResultsMap from "../../components/ResultsMap/ResultsMap";
import ResultsListPlaceholder from "../../placeholders/ResultsListPlaceholder/ResultsListPlaceholder";
import { Quizzes } from "../../helpers/quizzes";

const CountryResultsListContainer = ({ checkedCountries }) => {
  const { countriesByContinent, isPending } = useCountries();

  if (isPending) {
    return <ResultsListPlaceholder noOfLines={197} />;
  }

  return (
    <ResultsMap
      quiz={Quizzes.CountriesOfTheWorld}
      results={checkedCountries}
      map={countriesByContinent}
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
