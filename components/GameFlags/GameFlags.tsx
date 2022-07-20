import React, { FC, useContext } from "react";
import { Flex, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";

import DraggableFlag from "../DraggableFlag";
import DraggableFlagCarousel from "../DraggableFlagCarousel";
import useFlagGroups from "../../hooks/UseFlagGroups";
import { FlagGameContext } from "../../context/FlagGameContext";
import DraggableFlagPreview from "../DraggableFlagPreview";

interface Props {
  codes?: string[];
  onCheckSubmission?: (submission: string) => void;
}

const GameFlags: FC<Props> = ({
  codes = [],
  onCheckSubmission = (): void => {},
}) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { dragItem } = useContext(FlagGameContext);
  const { getFlagUrlByCode } = useFlagGroups();

  if (isMobile) {
    const imageUrl = getFlagUrlByCode(dragItem?.code);
    return (
      <Flex
        width="100%"
        position="relative"
        height="100px"
        marginRight={10}
        alignItems="center"
      >
        {imageUrl && (
          <DraggableFlagPreview code={dragItem?.code} imageUrl={imageUrl} />
        )}
        <DraggableFlagCarousel
          codes={codes}
          onCheckSubmission={onCheckSubmission}
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
        {[...Array.from(new Set(codes))]?.map((code) => {
          const imageUrl = getFlagUrlByCode(code);
          if (imageUrl) {
            return (
              <DraggableFlag
                key={code}
                code={code}
                imageUrl={imageUrl}
                checkSubmission={onCheckSubmission}
              />
            );
          }
        })}
      </SimpleGrid>
    </Flex>
  );
};

export default GameFlags;
