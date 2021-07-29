import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Box, Flex, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import withScrolling from "react-dnd-scrolling";

const ScrollingComponent = withScrolling("div");

import DraggableFlag from "../DraggableFlag";

const GameFlags = ({ codes, acceptedFlag, onCheckSubmission, onNextFlag }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const nextFlagsRef = useRef();

  useEffect(() => {
    const nextFlag = codes[Math.floor(Math.random() * codes.length)];

    const nextFlagDragItems = codes
      .sort(() => 0.5 - Math.random())
      .slice(0, 11);

    console.log(nextFlagDragItems, "nextFlagDragItems");

    const dragItemsWithNextAnswer = [...nextFlagDragItems, nextFlag.code]
      .filter(Boolean)
      .sort(() => 0.5 - Math.random());
    nextFlagsRef.current = dragItemsWithNextAnswer;
    onNextFlag(nextFlag);
  }, [acceptedFlag]);

  console.log(nextFlagsRef, "nextFlagsRefnextFlagsRef");

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
            {nextFlagsRef.current.map((code) => (
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
          minHeight="92vh"
          backgroundColor="#E0E0E0"
          alignItems="center"
          justifyContent="center"
        >
          <SimpleGrid columns={2} spacingX={10} spacingY={6}>
            {nextFlagsRef.current?.map((code) => (
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
