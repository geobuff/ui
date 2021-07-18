import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import withScrolling from "react-dnd-scrolling";

const ScrollingComponent = withScrolling("div");

import DraggableFlag from "../DraggableFlag";

const GameFlags = ({ codes, onCheckSubmission }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {isMobile ? (
        <Box as={ScrollingComponent} overflowX="auto">
          <Box
            width="2000px"
            position="relative"
            height="100px"
            marginRight={10}
            marginY={5}
          >
            {codes.map((code) => (
              <DraggableFlag
                key={code}
                code={code}
                checkSubmission={onCheckSubmission}
                mx={3}
              />
            ))}
          </Box>
        </Box>
      ) : (
        <Flex
          minWidth="300px"
          backgroundColor="#E0E0E0"
          alignItems="center"
          justifyContent="center"
        >
          <SimpleGrid columns={2} spacingX={10} spacingY={6}>
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
