import React from "react";
import PropTypes from "prop-types";

import { AspectRatio, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../helpers/item-types";

const FlagDropZone = ({
  acceptedFlagName,
  hasGameStarted,
  submissionCorrect,
  submissionIncorrect,
}) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.FLAG,
    drop: () => ({ name: ItemTypes.DROPZONE }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const dropZoneNode = (
    <Flex
      flex={1}
      justifyContent="center"
      alignItems="center"
      ref={drop}
      role="Dropzone"
      minWidth={{ base: "175px", lg: "335px" }}
      minHeight={{ base: "100px", lg: "243px" }}
      height={{ base: "100%", lg: "335px" }}
      width={{ base: "100%", lg: "243px" }}
      margin={{ base: 0, lg: 1 }}
      borderRadius="8%"
      transition="all 150ms ease-out"
      transform={isOver && "scale(1.125)"}
      background={
        submissionCorrect
          ? "green.500"
          : submissionIncorrect
          ? "red.500"
          : "#236175"
      }
    >
      {hasGameStarted && !submissionCorrect && !submissionIncorrect && (
        <Text color="white">
          {canDrop && isOver ? "Release to drop..." : "Drag a flag here..."}
        </Text>
      )}
    </Flex>
  );

  return (
    <Flex
      width="100%"
      height="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
      flex={1}
      minWidth={{ base: "100%", md: "79%" }}
      paddingLeft={{ base: 0, lg: "375px" }}
    >
      {isMobile ? (
        <AspectRatio width="60%" ratio={8 / 5}>
          {dropZoneNode}
        </AspectRatio>
      ) : (
        <AspectRatio width="40%" ratio={2.2 / 1.4}>
          {dropZoneNode}
        </AspectRatio>
      )}

      <Text
        opacity={hasGameStarted ? "1" : "0"}
        transition="200ms ease-in-out"
        fontSize={{ base: "md", sm: "xl", md: "3xl" }}
        fontWeight="bold"
        marginY={5}
        color="#FFFFFF"
        minHeight="40px"
      >
        {acceptedFlagName}
      </Text>
    </Flex>
  );
};
FlagDropZone.propTypes = {
  acceptedFlagName: PropTypes.string,
  hasGameStarted: PropTypes.bool,
  submissionCorrect: PropTypes.bool,
  submissionIncorrect: PropTypes.bool,
};
FlagDropZone.defaultTypes = {
  acceptedFlagName: "",
  hasGameStarted: false,
  submissionCorrect: false,
  submissionIncorrect: false,
};

export default FlagDropZone;
