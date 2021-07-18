import React from "react";
import PropTypes from "prop-types";

import { Flex, Text, Heading } from "@chakra-ui/react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../helpers/item-types";

const FlagDropZone = ({
  acceptedFlagName,
  hasGameStarted,
  submissionCorrect,
  submissionIncorrect,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.FLAG,
    drop: () => ({ name: ItemTypes.DROPZONE }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <Flex
      width="100%"
      height="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
      flex={1}
      minWidth={{ base: "100%", md: "78%" }}
      paddingLeft={{ base: 0, md: "375px" }}
    >
      {hasGameStarted && (
        <Heading mb={9} color="#FFFFFF">
          {acceptedFlagName}
        </Heading>
      )}
      <Flex
        flex={1}
        justifyContent="center"
        alignItems="center"
        ref={drop}
        role="Dropzone"
        width={{ base: "206px", md: "335px" }}
        minHeight={{ base: "40px", md: "243px" }}
        height="100%"
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
