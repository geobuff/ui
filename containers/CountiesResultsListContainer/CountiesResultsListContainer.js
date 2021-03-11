import React from "react";
import PropTypes from "prop-types";

import ResultsListWrapper from "../../components/ResultsListWrapper/ResultsListWrapper";
import ResultsListPlaceholder from "../../placeholders/ResultsListPlaceholder/ResultsListPlaceholder";
import useMapping from "../../hooks/UseMapping";
import { mergeArrayByName } from "../../helpers/array";

const CountiesResultsListContainer = ({ quiz, checkedCounties }) => {
  const { data: counties, loading } = useMapping(quiz.id);

  if (loading) {
    return <ResultsListPlaceholder noOfLines={quiz.maxScore} />;
  }

  return (
    <ResultsListWrapper
      quizId={quiz.id}
      results={mergeArrayByName(counties, checkedCounties)}
    />
  );
};

CountiesResultsListContainer.propTypes = {
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
