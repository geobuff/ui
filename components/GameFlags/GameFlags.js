import React from "react";
import PropTypes from "prop-types";
import { Flex, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";

import DraggableFlag from "../DraggableFlag";

const GameFlags = ({ codes, onCheckSubmission }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {isMobile ? (
        <Flex justifyContent="center">
          {codes.map((code) => (
            <DraggableFlag
              key={code}
              code={code}
              checkSubmission={onCheckSubmission}
              mx={3}
            />
          ))}
        </Flex>
      ) : (
        <Flex
          minWidth="300px"
          minHeight="92vh"
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
              />
            ))}
          </SimpleGrid>
        </Flex>
      )}
    </>
  );
};

GameFlags.propTypes = {
  codes: PropTypes.arrayOf(PropTypes.string),
  onCheckSubmission: PropTypes.func,
};
GameFlags.defaultProps = {
  codes: [],
  onCheckSubmission: () => {},
};

export default GameFlags;
