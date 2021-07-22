import React from "react";
import PropTypes from "prop-types";
import { getFlagUrl } from "@geobuff/flags";
import { useDrag } from "react-dnd";
import { Box } from "@chakra-ui/react";

import Image from "../Image";
import { ItemTypes } from "../../helpers/item-types";

import { usePreview } from "react-dnd-preview";

// TODO: add a nice preview for mobile
const DraggableFlagPreview = () => {
  const { display, itemType, style } = usePreview();
  if (!display) {
    return null;
  }
  return <div style={style}>{itemType}</div>;
};

const DraggableFlag = ({ code, checkSubmission, ...props }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.FLAG,
    item: { name: code },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        checkSubmission(item.name);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <>
      <DraggableFlagPreview />
      <Box
        ref={drag}
        role="Flag"
        opacity={isDragging ? 0.4 : 1}
        cursor="pointer"
        {...props}
        position="relative"
        display="inline-block"
        float="left"
      >
        <Image
          src={getFlagUrl(code)}
          borderRadius={4}
          height="72px"
          width="98px"
        />
      </Box>
    </>
  );
};

DraggableFlag.propTypes = {
  code: PropTypes.string,
  checkSubmission: PropTypes.func,
};
DraggableFlag.defaultProps = {
  code: "",
  checkSubmission: () => {},
};

export default DraggableFlag;