import React from "react";
import PropTypes from "prop-types";

import StateListItem from "../StateListItem";
import { Box, List, Text } from "@chakra-ui/core";

const StateList = ({ states, verb }) => {
  if (!states || states.length === 0) {
    return (
      <Box backgroundColor="#F0F0F0" borderRadius={12} p={5}>
        <Text textAlign="center" opacity={0.5} fontWeight={500}>
          No {verb} to display
        </Text>
      </Box>
    );
  }

  return (
    <List>
      {states.map((state) => (
        <StateListItem
          key={state.code}
          my={2}
          isHidden={!state.checked}
          {...state}
        />
      ))}
    </List>
  );
};

StateList.propTypes = {
  states: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  verb: PropTypes.string,
};
StateList.defaultProps = {
  states: [],
  verb: "states",
};

export default StateList;
