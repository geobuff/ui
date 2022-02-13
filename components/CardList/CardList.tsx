import React, { FC } from "react";
import {
  AspectRatio,
  Box,
  Flex,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";

import DelayedRender from "../DelayedRender";

export interface Props {
  type?: "trivia" | "quiz";
}

const CardList: FC<Props> = ({ children }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <DelayedRender shouldFadeIn waitBeforeShow={100}>
        <Box
          overflowX="scroll"
          overflowY="auto"
          whiteSpace="nowrap"
          width="100%"
          minHeight="230px"
        >
          {children}
        </Box>
      </DelayedRender>
    );
  }

  return (
    <DelayedRender shouldFadeIn waitBeforeShow={100}>
      <SimpleGrid
        column={3}
        justifyContent="center"
        minChildWidth={{ base: "140px", sm: "185px", md: "206px" }}
        spacing={{ base: "12px", md: "24px" }}
      >
        {children}
      </SimpleGrid>
    </DelayedRender>
  );
};

export default CardList;
