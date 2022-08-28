import React, { FC, useContext } from "react";
import { Flex, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";

import DraggableFlag from "../DraggableFlag";
import DraggableFlagCarousel from "../DraggableFlagCarousel";
import { FlagGameContext } from "../../context/FlagGameContext";
import DraggableFlagPreview from "../DraggableFlagPreview";
import { FlagDetails } from "../../types/flag-details";

interface Props {
  flags?: FlagDetails[];
  onCheckSubmission?: (submission: string) => void;
}

const GameFlags: FC<Props> = ({
  flags = [],
  onCheckSubmission = (): void => {},
}) => {
  const isMobile = useBreakpointValue({ base: true, lg: false }, { ssr: true });
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
        {dragItem?.url && (
          <DraggableFlagPreview code={dragItem.code} imageUrl={dragItem.url} />
        )}
        <DraggableFlagCarousel
          flags={flags}
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
        {[...Array.from(new Set(flags))]?.map((flag) => (
          <DraggableFlag
            key={flag.code}
            code={flag.code}
            url={flag.url}
            checkSubmission={onCheckSubmission}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default GameFlags;
