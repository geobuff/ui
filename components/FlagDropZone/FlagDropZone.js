import React from "react";
import PropTypes from "prop-types";

import { Flex, Text, Heading } from "@chakra-ui/react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../helpers/item-types";

const FlagDropZone = ({ acceptedFlagName, hasGameStarted }) => {
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
    >
      {hasGameStarted && <Heading mb={6}>{acceptedFlagName}</Heading>}
      <Flex
        justifyContent="center"
        alignItems="center"
        ref={drop}
        role="Dropzone"
        background={
          canDrop && isOver ? "darkgreen" : canDrop ? "darkkhaki" : "#222"
        }
        width={{ base: "80%", md: "400px" }}
        height="300px"
        borderRadius={12}
        borderWidth="2px"
        borderColor="black"
      >
        {hasGameStarted && (
          <Text color={!canDrop && !isOver ? "white" : "inherit"}>
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
};
FlagDropZone.defaultTypes = {
  acceptedFlagName: "",
  hasGameStarted: false,
};

export default FlagDropZone;
