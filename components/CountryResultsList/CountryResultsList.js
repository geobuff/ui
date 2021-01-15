import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Text } from "@chakra-ui/core";
import CountryList from "../CountryList";

const mergeById = (a1, a2) =>
  a1.map((itm) => ({
    ...a2.find((item) => item.name === itm.name && item),
    ...itm,
  }));

const CountryResultsList = ({ checkedCountries, countriesByContinent }) => {
  return (
    <Box textAlign="left">
      <Divider my={4} />
      <Text fontSize="xl" mt={2} fontWeight="bold">
        {"Results"}
      </Text>
      <Divider my={3} />
      <Box>
        {Object.entries(countriesByContinent).map(([key, value], index) => (
          <Box mt={5} key={index}>
            <Text fontWeight="bold" my={3} textTransform="uppercase">
              {key}
            </Text>
            <CountryList countries={mergeById(value, checkedCountries)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

CountryResultsList.propTypes = {
  // TODO: Suss out propType for this shape
  countriesByContinent: PropTypes.object,
  checkedCountries: PropTypes.array,
};
CountryResultsList.defaultProps = {
  countriesByContinent: [],
  checkedCountries: [],
};

export default CountryResultsList;
