import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";

import DraggableFlag from "../DraggableFlag";

const GameFlags = ({ codes, onCheckSubmission, hasGameStarted }) => (
  <Box width="400px" height="100%" backgroundColor="#E0E0E0">
    {!hasGameStarted ? (
      <SimpleGrid columns={2}>
        {[...Array(10)].map((_, i) => (
          <Flex key={i} justifyContent="center">
            <Box
              width="100px"
              height="80px"
              my={5}
              borderRadius={12}
              background="#A0AEC0"
            />
          </Flex>
        ))}
      </SimpleGrid>
    ) : (
      <SimpleGrid columns={2}>
        {codes.map((code) => (
          <Flex key={code} justifyContent="center">
            <DraggableFlag code={code} checkSubmission={onCheckSubmission} />
          </Flex>
        ))}
      </SimpleGrid>
    )}
  </Box>
);

GameFlags.propTypes = {
  codes: PropTypes.arrayOf(PropTypes.string),
  onCheckSubmission: PropTypes.func,
  hasGameStarted: PropTypes.bool,
};
GameFlags.defaultProps = {
  codes: [],
  onCheckSubmission: () => {},
  hasGameStarted: false,
};

export default GameFlags;
