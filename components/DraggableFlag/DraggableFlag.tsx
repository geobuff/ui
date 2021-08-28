import React, { FC, useContext, useEffect } from "react";

import { getFlagUrl } from "@geobuff/flags";
import { useDrag } from "react-dnd";
import { Box } from "@chakra-ui/react";

import Image from "../Image";
import { ItemTypes } from "../../types/item-types";

import { usePreview } from "react-dnd-preview";
import { FlagGameContext } from "../../context/FlagGameContext";

interface Props {
  code?: string;
  checkSubmission?: (submission: string) => void;
  [x: string]: any;
}

// TODO: add a nice preview for mobile
const DraggableFlagPreview: FC = () => {
  const { display, itemType, style } = usePreview();
  if (!display) {
    return null;
  }
  return <div style={style}>{itemType}</div>;
};

const DraggableFlag: FC<Props> = ({
  code = "",
  checkSubmission = (submission: string) => {},
  ...props
}) => {
  const { handleDragging } = useContext(FlagGameContext);

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

  useEffect(() => {
    handleDragging(isDragging);
  }, [isDragging]);

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

export default DraggableFlag;
