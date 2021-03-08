import React from "react";
import PropTypes from "prop-types";
import useCapitals from "../../hooks/UseCapitals";

import ResultsListPlaceholder from "../../placeholders/ResultsListPlaceholder/ResultsListPlaceholder";
import ResultsMap from "../../components/ResultsMap/ResultsMap";

const CapitalResultsListContainer = ({ quiz, checkedCapitals }) => {
  const { capitalsByContinent, isPending } = useCapitals();

  if (isPending) {
    return <ResultsListPlaceholder noOfLines={quiz.maxScore} />;
  }

  return (
    <ResultsMap
      quiz={quiz}
      results={checkedCapitals}
      map={capitalsByContinent}
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
