import React from "react";
import PropTypes from "prop-types";
import useCapitals from "../../hooks/UseCapitals";

import ResultsListPlaceholder from "../../placeholders/ResultsListPlaceholder/ResultsListPlaceholder";
import ResultsMap from "../../components/ResultsMap/ResultsMap";
import { Quizzes } from "../../helpers/quizzes";

const CapitalResultsListContainer = ({ checkedCapitals }) => {
  const { capitalsByContinent, isPending } = useCapitals();

  if (isPending) {
    return <ResultsListPlaceholder noOfLines={197} />;
  }

  return (
    <ResultsMap
      quiz={Quizzes.CapitalsOfTheWorld}
      results={checkedCapitals}
      map={capitalsByContinent}
    />
  );
};

CapitalResultsListContainer.propTypes = {
  checkedCapitals: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};

CapitalResultsListContainer.defaultProps = {
  checkedCapitals: [],
};

export default CapitalResultsListContainer;
