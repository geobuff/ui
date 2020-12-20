import React from "react";
// import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/core";
import CountryList from "../CountryList";

import { allCountriesByContinent } from "../../helpers/countries";

const CountryResultsList = () => {
  return (
    <Box>
      <Text fontSize="xl" my={3} fontWeight={700}>
        {"Results"}
      </Text>
      {Object.entries(allCountriesByContinent).map(([key, value], index) => (
        <Box mt={6} key={index}>
          <Text my={3} fontSize="lg" fontWeight={700}>
            {key}
          </Text>
          <CountryList countries={value} />
        </Box>
      ))}
    </Box>
  );
};

CountryResultsList.propTypes = {};
CountryResultsList.defaultProps = {};

export default CountryResultsList;
