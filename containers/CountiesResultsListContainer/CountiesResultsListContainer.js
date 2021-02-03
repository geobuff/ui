import React from "react";
import PropTypes from "prop-types";

import StatesResultsList from "../../components/StatesResultsList/StatesResultsList";
import ResultsListPlaceholder from "../../placeholders/ResultsListPlaceholder/ResultsListPlaceholder";
import useCounties from "../../hooks/UseCounties";

const CountiesResultsListContainer = ({ checkedCounties }) => {
  const { allCounties, isPending } = useCounties();

  if (isPending) {
    return <ResultsListPlaceholder noOfLines={42} />;
  }

  return (
    <StatesResultsList states={allCounties} checkedStates={checkedCounties} />
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
