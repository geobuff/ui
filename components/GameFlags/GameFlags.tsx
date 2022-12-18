import React, { FC, useContext } from "react";

import {
  DragItem,
  DraggableCarousel,
  DraggableItem,
} from "@geobuff/buff-ui/components";

import { Flex, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";

import { FlagGameContext } from "../../context/FlagGameContext";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import { FlagDetails } from "../../types/flag-details";
import DraggableFlagPreview from "../DraggableFlagPreview";

const getDraggableItem = (
  flag: FlagDetails,
  onCheckSubmission: (submission: string) => void,
  handleDragging: (dragItem: DragItem) => void
): JSX.Element => (
  <DraggableItem
    key={flag.code}
    code={flag.code}
    url={flag.url}
    checkSubmission={onCheckSubmission}
    handleDragging={handleDragging}
  >
    <Image
      src={flag.url}
      alt={`Flag for ${flag.code}`}
      draggable="false"
      width={100}
      height={64}
      objectFit="cover"
      style={{
        borderRadius: 6,
      }}
      priority
    />
  </DraggableItem>
);

interface Props {
  flags?: FlagDetails[];
  onCheckSubmission?: (submission: string) => void;
}

const GameFlags: FC<Props> = ({
  flags = [],
  onCheckSubmission = (): void => {},
}) => {
  const { t } = useContext(LanguageContext);
  const { dragItem, handleDragging } = useContext(FlagGameContext);

  const isMobile = useBreakpointValue({ base: true, lg: false });

  if (isMobile) {
    return (
      <Flex
        width="100%"
        position="relative"
        height="100px"
        marginRight={10}
        alignItems="center"
      >
        {dragItem?.url && (
          <DraggableFlagPreview code={dragItem.code} imageUrl={dragItem.url} />
        )}
        <DraggableCarousel
          isAppMobile={process.env.NEXT_PUBLIC_APP_MODE === "mobile"}
          noItemsMessage={t.gameFlags.noItemsMessage}
          handleDragging={handleDragging}
          items={flags.map((flag) =>
            getDraggableItem(flag, onCheckSubmission, handleDragging)
          )}
        />
      </Flex>
    );
  }

  return (
    <Flex
      minWidth="300px"
      width="100%"
      minHeight="220px"
      backgroundColor="#236175"
      alignItems="center"
      justifyContent="center"
      paddingLeft="390px"
    >
      <SimpleGrid columns={5} spacingX={6} spacingY={6}>
        {[...Array.from(new Set(flags))]?.map((flag) =>
          getDraggableItem(flag, onCheckSubmission, handleDragging)
        )}
      </SimpleGrid>
    </Flex>
  );
};

export default GameFlags;
