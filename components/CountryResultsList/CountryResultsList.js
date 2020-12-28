import React from "react";
// import PropTypes from "prop-types";
import { Box, Divider, Text } from "@chakra-ui/core";
import CountryList from "../CountryList";

import { allCountriesByContinent } from "../../helpers/countries";

// Will likely lift the countries out of the this component
// and pass them in as props, but this should work for now
const CountryResultsList = () => {
  return (
    <Box textAlign="left">
      <Divider my={4} />
      <Text fontSize="xl" mt={2} fontWeight="bold">
        {"Results"}
      </Text>
      <Divider my={3} />

      {Object.entries(allCountriesByContinent).map(([key, value], index) => (
        <Box mt={5} key={index}>
          <Text fontWeight="bold" my={3} textTransform="uppercase">
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

export default React.memo(CountryResultsList);
