import React from "react";
import PropTypes from "prop-types";
import { Flex, SimpleGrid } from "@chakra-ui/react";

import DraggableFlag from "../DraggableFlag";

const GameFlags = ({ codes, onCheckSubmission, hasGameStarted }) => (
  <Flex
    width="400px"
    height="92vh"
    backgroundColor="#E0E0E0"
    alignItems="center"
    justifyContent="center"
  >
    <SimpleGrid columns={2} spacingX={10}>
      {codes.map((code) => (
        <DraggableFlag
          key={code}
          code={code}
          checkSubmission={onCheckSubmission}
          hasGameStarted={hasGameStarted}
        />
      ))}
    </SimpleGrid>
  </Flex>
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
