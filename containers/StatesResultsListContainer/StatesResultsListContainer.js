import React from "react";
import PropTypes from "prop-types";

import ResultsListPlaceholder from "../../placeholders/ResultsListPlaceholder/ResultsListPlaceholder";
import { mergeArrayByName } from "../../helpers/array";
import ResultsListWrapper from "../../components/ResultsListWrapper/ResultsListWrapper";
import useMapping from "../../hooks/UseMapping";

const StatesResultsListContainer = ({ quiz, checkedStates }) => {
  const { data: states, loading } = useMapping(quiz.id);

  if (loading) {
    return <ResultsListPlaceholder noOfLines={quiz.maxScore} />;
  }

  return (
    <ResultsListWrapper
      quizId={quiz.id}
      results={mergeArrayByName(states, checkedStates)}
    />
  );
};

StatesResultsListContainer.propTypes = {
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
  checkedStates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};

StatesResultsListContainer.defaultProps = {
  quiz: {},
  checkedStates: [],
};

export default StatesResultsListContainer;
