import React, { FC, useContext, useEffect } from "react";

import { getFlagUrl } from "@geobuff/flags";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { Box } from "@chakra-ui/react";

import Image from "../Image";
import { ItemTypes } from "../../types/item-types";

import { FlagGameContext } from "../../context/FlagGameContext";
import { DragResult } from "../../types/drag-result";
import { CurrentUserContext } from "../../context/CurrentUserContext";
// import DraggableFlagPreview from "./DraggableFlagPreview";

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
  const { userAgent } = useContext(CurrentUserContext);

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

  // TODO: km - remove once added to BottomSheet
  // const shouldShowFlagPreview = isDragging && userAgent?.isMobile;

  return (
    <>
      <Box
        ref={drag}
        role="Flag"
        opacity={isDragging ? 0.4 : 1}
        cursor="pointer"
        display="inline-block"
        position="relative"
        {...props}
      >
        <Image
          src={getFlagUrl(code)}
          width="100%"
          maxWidth={{ base: "76px", lg: "100px" }}
          minWidth={{ base: "76px", lg: "100px" }}
          height={{ base: "62px", lg: "64px" }}
          objectFit="cover"
          borderRadius={6}
        />
      </Box>
    </>
  );
};

export default DraggableFlag;
