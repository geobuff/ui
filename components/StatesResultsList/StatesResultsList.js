import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Text } from "@chakra-ui/core";

import StateList from "../StateList";
import { mergeArrayByName } from "../../helpers/array";

const StatesResultsList = ({ states, checkedStates }) => (
  <Box textAlign="left">
    <Divider my={4} />
    <Text fontSize="xl" mt={2} fontWeight="bold">
      {"Results"}
    </Text>
    <Divider my={3} />
    <Box>
      <StateList states={mergeArrayByName(states, checkedStates)} />
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
