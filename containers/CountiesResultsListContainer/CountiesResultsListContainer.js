import React from "react";
import PropTypes from "prop-types";

import ResultsListWrapper from "../../components/ResultsListWrapper/ResultsListWrapper";
import ResultsListPlaceholder from "../../placeholders/ResultsListPlaceholder/ResultsListPlaceholder";
import useCounties from "../../hooks/UseCounties";
import { mergeArrayByName } from "../../helpers/array";

const CountiesResultsListContainer = ({ quiz, checkedCounties }) => {
  const { allCounties, isPending } = useCounties();

  if (isPending) {
    return <ResultsListPlaceholder noOfLines={quiz.maxScore} />;
  }

  return (
    <ResultsListWrapper
      quiz={quiz}
      results={mergeArrayByName(allCounties, checkedCounties)}
    />
  );
};

CountiesResultsListContainer.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxScore: PropTypes.number,
    imageUrl: PropTypes.string,
    verb: PropTypes.string,
    apiPath: PropTypes.string,
    hasLeaderboard: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
  checkedCounties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};

CountiesResultsListContainer.defaultProps = {
  quiz: {},
  checkedCounties: [],
};

export default CountiesResultsListContainer;
