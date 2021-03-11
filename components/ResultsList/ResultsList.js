import React from "react";
import PropTypes from "prop-types";

import ResultsListItem from "../ResultsListItem";
import { List } from "@chakra-ui/react";

const ResultsList = ({ quizId, results }) => (
  <List>
    {results.map((result) => (
      <ResultsListItem
        quizId={quizId}
        key={result.code}
        my={2}
        isHidden={!result.checked}
        {...result}
      />
    ))}
  </List>
);

ResultsList.propTypes = {
  quizId: PropTypes.number,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};
ResultsList.defaultProps = {
  quizId: 1,
  results: [],
};

export default ResultsList;
