import React, { FC, useContext, useEffect } from "react";

import { DragSourceMonitor, useDrag } from "react-dnd";
import { usePreview } from "react-dnd-preview";
import { isMobile } from "react-device-detect";
import { Box, BoxProps } from "@chakra-ui/react";

import Image from "next/image";
import { FlagGameContext } from "../../context/FlagGameContext";
import { ItemTypes } from "../../types/item-types";
import { DragResult } from "../../types/drag-result";

interface CollectResult {
  isDragging: boolean;
  handlerId: string | symbol | null;
}

interface Props extends BoxProps {
  code?: string;
  imageUrl: string;
  checkSubmission?: (submission: string) => void;
}

const DraggableFlag: FC<Props> = ({
  code = "",
  imageUrl,
  checkSubmission = (): void => {},
  ...props
}) => {
  const { handleDragging } = useContext(FlagGameContext);
  const { display, style } = usePreview();

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

  const shouldShowFlagPreview = isMobile && display && isDragging;

  useEffect(() => {
    handleDragging({ isDragging, code });
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
      {shouldShowFlagPreview && (
        <div style={style}>
          <Image
            src={imageUrl}
            alt={`Preview for ${code}`}
            width={98}
            height={72}
            style={{
              borderRadius: 4,
            }}
            priority
          />
        </div>
      )}
      <Box ref={drag}>
        <Image
          src={imageUrl}
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
      </Box>
    </Box>
  );
};

export default DraggableFlag;
