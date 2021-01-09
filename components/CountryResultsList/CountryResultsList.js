import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Box, Divider, Text } from "@chakra-ui/core";
import CountryList from "../CountryList";

// Will likely lift the countries out of the this component
// and pass them in as props, but this should work for now
const CountryResultsList = () => {
  const [loading, setLoading] = useState(true);
  const [countriesByContinent, setCountriesByContinent] = useState();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/world/countries`)
      .then((response) => response.json())
      .then((data) => {
        setCountriesByContinent(data);
        setLoading(false);
      });
  }, []);

  return (
    <Box textAlign="left">
      <Divider my={4} />
      <Text fontSize="xl" mt={2} fontWeight="bold">
        {"Results"}
      </Text>
      <Divider my={3} />
      {loading ? (
        <Box>Loading...</Box>
      ) : (
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
      )}
    </Box>
  );
};

CountryResultsList.propTypes = {};
CountryResultsList.defaultProps = {};

export default React.memo(CountryResultsList);
