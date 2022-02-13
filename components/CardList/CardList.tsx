import React, { FC } from "react";
import { Box, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";

export interface Props {
  type?: "trivia" | "quiz";
}

// TODO: fix layout when less items than grid

const CardList: FC<Props> = ({ children }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Box
        overflowX="scroll"
        overflowY="auto"
        whiteSpace="nowrap"
        width="100%"
        paddingBottom={2}
      >
        {children}
      </Box>
    );
  }

  return (
    <SimpleGrid
      column={3}
      justifyContent="center"
      minChildWidth={{ base: "140px", sm: "185px", md: "206px" }}
      spacing={{ base: "12px", md: "24px" }}
    >
      {children}
    </SimpleGrid>
  );
};

export default CardList;
