import React, { FC, useContext } from "react";
import { Flex, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";

import DraggableFlag from "../DraggableFlag";
import DraggableFlagPreview from "../DraggableFlag/DraggableFlagPreview";
import { FlagGameContext } from "../../context/FlagGameContext";
import DraggableFlagCarousel from "../DraggableFlagCarousel";

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

  if (isMobile) {
    return (
      <Flex
        width="100%"
        position="relative"
        height="100px"
        marginRight={10}
        alignItems="center"
      >
        <DraggableFlagPreview code={dragItem?.code} />
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
        {[...Array.from(new Set(codes))]?.map((code) => (
          <DraggableFlag
            key={code}
            code={code}
            checkSubmission={onCheckSubmission}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default GameFlags;
