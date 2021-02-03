import React from "react";
import PropTypes from "prop-types";

import ResultsListWrapper from "../../components/ResultsListWrapper/ResultsListWrapper";
import ResultsListPlaceholder from "../../placeholders/ResultsListPlaceholder/ResultsListPlaceholder";
import useCounties from "../../hooks/UseCounties";
import { Quizzes } from "../../helpers/quizzes";
import { mergeArrayByName } from "../../helpers/array";

const CountiesResultsListContainer = ({ checkedCounties }) => {
  const { allCounties, isPending } = useCounties();

  if (isPending) {
    return <ResultsListPlaceholder noOfLines={42} />;
  }

  return (
    <ResultsListWrapper
      quiz={Quizzes.UKCounties}
      results={mergeArrayByName(allCounties, checkedCounties)}
    />
  );
};

CountiesResultsListContainer.propTypes = {
  checkedCounties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};

CountiesResultsListContainer.defaultProps = {
  checkedCounties: [],
};

export default CountiesResultsListContainer;
