import React, { FC } from "react";
import { Box, Flex, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import withScrolling from "react-dnd-scrolling";

const ScrollingComponent = withScrolling("div");

import DraggableFlag from "../DraggableFlag";

interface Props {
  codes?: string[];
  onCheckSubmission?: (submission: string) => void;
}

const GameFlags: FC<Props> = ({
  codes = [],
  onCheckSubmission = (submission: string): void => {},
}) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      {isMobile ? (
        <Box as={ScrollingComponent} overflowX="auto">
          <Flex
            width="1525px"
            position="relative"
            height="100px"
            marginRight={10}
            alignItems="center"
          >
            {[...Array.from(new Set(codes))]?.map((code) => (
              <DraggableFlag
                key={code}
                code={code}
                checkSubmission={onCheckSubmission}
                mx={3}
              />
            ))}
          </Flex>
        </Box>
      ) : (
        <Flex
          minWidth="300px"
          width="100%"
          minHeight="220px"
          backgroundColor="#236175"
          alignItems="center"
          justifyContent="center"
          paddingLeft="390px"
        >
          <SimpleGrid columns={5} spacingX={8} spacingY={6}>
            {[...Array.from(new Set(codes))]?.map((code) => (
              <DraggableFlag
                key={code}
                code={code}
                checkSubmission={onCheckSubmission}
              />
            ))}
          </SimpleGrid>
        </Flex>
      )}
    </>
  );
};

export default GameFlags;
