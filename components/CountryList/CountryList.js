import React from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/core";

import CountryListItem from "../CountryListItem/CountryListItem";

const CountryList = ({ countries }) => {
  if (!countries) {
    return null;
  }

  return countries.map(({ code, name }) => (
    <Box key={code} my={1}>
      <CountryListItem code={code} name={name} />
    </Box>
  ));
};

CountryList.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
};
CountryList.defaultProps = {
  countries: [],
};

export default CountryList;
