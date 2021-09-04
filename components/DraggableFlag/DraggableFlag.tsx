import React, { FC, useContext, useEffect } from "react";

import { getFlagUrl } from "@geobuff/flags";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { Box } from "@chakra-ui/react";

import Image from "../Image";
import { ItemTypes } from "../../types/item-types";

import { usePreview } from "react-dnd-preview";
import { FlagGameContext } from "../../context/FlagGameContext";
import { DragResult } from "../../types/drag-result";
import { CurrentUserContext } from "../../context/CurrentUserContext";

// TODO: add a nice preview for mobile
const DraggableFlagPreview: FC = () => {
  const { display, itemType, style } = usePreview();
  const { userAgent } = useContext(CurrentUserContext);

  console.log(userAgent, "userAgent:flags");

  if (!display) {
    return null;
  }
  return <div style={style}>{itemType}</div>;
};

interface CollectResult {
  isDragging: boolean;
  handlerId: string | symbol | null;
}

interface Props {
  code?: string;
  checkSubmission?: (submission: string) => void;
  [x: string]: any;
}

const DraggableFlag: FC<Props> = ({
  code = "",
  checkSubmission = (submission: string): void => {},
  ...props
}) => {
  const { handleDragging } = useContext(FlagGameContext);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.FLAG,
    item: { name: code },
    end: (item: DragResult, monitor: DragSourceMonitor): void => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        checkSubmission(item.name);
      }
    },
    collect: (monitor: DragSourceMonitor): CollectResult => ({
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
