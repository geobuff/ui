import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Text } from "@chakra-ui/core";

import CountryList from "../CountryList";
import { mergeArrayByName } from "../../helpers/array";

const StatesResultsList = ({ states, checkedStates }) => (
  <Box textAlign="left">
    <Divider my={4} />
    <Text fontSize="xl" mt={2} fontWeight="bold">
      {"Results"}
    </Text>
    <Divider my={3} />
    <Box>
      <CountryList
        countries={mergeArrayByName(states, checkedStates)}
        verb="states"
      />
    </Box>
  </Box>
);

StatesResultsList.propTypes = {
  states: PropTypes.array,
  checkedStates: PropTypes.array,
};
StatesResultsList.defaultProps = {
  states: [],
  checkedStates: [],
};

export default React.memo(StatesResultsList);
