import React, { FC, useContext, useEffect } from "react";

import { DragSourceMonitor, useDrag } from "react-dnd";
import { Box, BoxProps } from "@chakra-ui/react";

import Image from "next/image";
import { FlagGameContext } from "../../context/FlagGameContext";
import { ItemTypes } from "../../types/item-types";
import { DragResult } from "../../types/drag-result";
import useFlagUrl from "../../hooks/UseFlagUrl";

interface CollectResult {
  isDragging: boolean;
  handlerId: string | symbol | null;
}

interface Props extends BoxProps {
  code?: string;
  checkSubmission?: (submission: string) => void;
}

const DraggableFlag: FC<Props> = ({
  code = "",
  checkSubmission = (): void => {},
  ...props
}) => {
  const { handleDragging } = useContext(FlagGameContext);
  const { data: flagUrl } = useFlagUrl(code);

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
      {flagUrl && (
        <Image
          src={flagUrl}
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
