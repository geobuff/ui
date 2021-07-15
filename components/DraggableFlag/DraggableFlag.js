import React from "react";
import PropTypes from "prop-types";
import { getFlagUrl } from "@geobuff/flags";
import { useDrag } from "react-dnd";
import { Box } from "@chakra-ui/react";

import Image from "../Image";
import { ItemTypes } from "../../helpers/item-types";

const DraggableFlag = ({ code, checkSubmission, hasGameStarted }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.FLAG,
    item: { name: code },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (hasGameStarted && item && dropResult) {
        checkSubmission(item.name);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <Box ref={drag} role="Flag" opacity={isDragging ? 0.4 : 1} cursor="pointer">
      <Image src={getFlagUrl(code)} borderRadius={4} />
    </Box>
  );
};

DraggableFlag.propTypes = {
  code: PropTypes.string,
  checkSubmission: PropTypes.func,
  hasGameStarted: PropTypes.bool,
};
DraggableFlag.defaultProps = {
  code: "",
  checkSubmission: () => {},
  hasGameStarted: false,
};

export default DraggableFlag;
