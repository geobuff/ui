import React from "react";
import PropTypes from "prop-types";

import ResultsListPlaceholder from "../../placeholders/ResultsListPlaceholder/ResultsListPlaceholder";
import ResultsMap from "../../components/ResultsMap/ResultsMap";
import useMapping from "../../hooks/UseMapping";
import { groupMapping } from "../../helpers/mapping";

const CapitalResultsListContainer = ({ quiz, checkedCapitals }) => {
  const { data: capitals, loading } = useMapping(quiz.id);

  if (loading) {
    return <ResultsListPlaceholder noOfLines={quiz.maxScore} />;
  }

  return (
    <ResultsMap
      quizId={quiz.id}
      results={checkedCapitals}
      map={groupMapping(capitals)}
    />
  );
};

CapitalResultsListContainer.propTypes = {
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
  checkedCapitals: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};

CapitalResultsListContainer.defaultProps = {
  quiz: {},
  checkedCapitals: [],
};

export default CapitalResultsListContainer;
