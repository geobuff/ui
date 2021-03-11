import React from "react";
import PropTypes from "prop-types";
import useMapping from "../../hooks/UseMapping";

import ResultsMap from "../../components/ResultsMap/ResultsMap";
import ResultsListPlaceholder from "../../placeholders/ResultsListPlaceholder/ResultsListPlaceholder";
import { groupMapping } from "../../helpers/mapping";

const CountryResultsListContainer = ({ quiz, checkedCountries }) => {
  const { data: countries, loading } = useMapping(quiz.id);

  if (loading) {
    return <ResultsListPlaceholder noOfLines={quiz.maxScore} />;
  }

  return (
    <ResultsMap
      quizId={quiz.id}
      results={checkedCountries}
      map={groupMapping(countries)}
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
