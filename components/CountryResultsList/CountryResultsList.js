import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Text } from "@chakra-ui/core";
import CountryList from "../CountryList";

const CountryResultsList = ({ countriesByContinent }) => {
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
            <CountryList countries={value} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

CountryResultsList.propTypes = {
  countriesByContinent: PropTypes.object,
};
CountryResultsList.defaultProps = {};

export default React.memo(CountryResultsList);
