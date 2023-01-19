import React, { FC, useContext, useEffect } from "react";

import { Box, BoxProps } from "@chakra-ui/react";
import Image from "next/image";
import { DragSourceMonitor, useDrag } from "react-dnd";

import { FlagGameContext } from "../../contexts/FlagGameContext";

import { DragResult } from "../../types/drag-result";
import { ItemTypes } from "../../types/item-types";

interface CollectResult {
  isDragging: boolean;
  handlerId: string | symbol | null;
}

interface Props extends BoxProps {
  code: string;
  url: string;
  checkSubmission?: (submission: string) => void;
}

const DraggableFlag: FC<Props> = ({
  code,
  url,
  checkSubmission = (): void => {},
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
    handleDragging({ isDragging, code, url });
  }, [isDragging]);

  return (
    <Box
      ref={drag}
      role="Flag"
      opacity={isDragging ? 0.4 : 1}
      cursor="pointer"
      display="inline-block"
      position="relative"
      {...props}
    >
      {url && (
        <Image
          src={url}
          alt={`Flag for ${code}`}
          draggable="false"
          width={100}
          height={64}
          objectFit="cover"
          style={{
            borderRadius: 6,
          }}
          priority
        />
      )}
    </Box>
  );
};

export default DraggableFlag;
