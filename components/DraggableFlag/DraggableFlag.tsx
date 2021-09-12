import React, { FC, useContext, useEffect } from "react";

import { getFlagUrl } from "@geobuff/flags";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { Box } from "@chakra-ui/react";

import Image from "../Image";
import { ItemTypes } from "../../types/item-types";

import { FlagGameContext } from "../../context/FlagGameContext";
import { DragResult } from "../../types/drag-result";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import DraggableFlagPreview from "./DraggableFlagPreview";

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

  const shouldShowFlagPreview = isDragging && userAgent?.isMobile;

  return (
    <>
      {shouldShowFlagPreview && <DraggableFlagPreview code={code} />}
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
          width="100%"
          maxWidth={{ base: "72px", lg: "120px" }}
          minWidth={{ base: "72px", lg: "100px" }}
          height={{ base: "48px", lg: "64px" }}
          objectFit="cover"
          borderRadius={6}
        />
      </Box>
    </>
  );
};

export default DraggableFlag;
