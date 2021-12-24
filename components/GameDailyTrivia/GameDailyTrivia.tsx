import React, { FC } from "react";
import {
  Flex,
  Heading,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";

import GameDailyTriviaHeader from "./GameDailyTriviaHeader";
import GameTriviaButton from "../GameTriviaButton";
import GameDailyTriviaContent from "./GameDailyTriviaContent";

export interface Props {}

const GameDailyTrivia: FC<Props> = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isMobile === undefined) return null;
  return (
    <Flex
      flex={1}
      direction="column"
      height="100%"
      width="100%"
      maxWidth={1300}
      padding={5}
      marginLeft="auto"
      marginRight="auto"
    >
      <GameDailyTriviaHeader marginY={4} />

      {/* <GameDailyTriviaContent type="map" /> */}
      <GameDailyTriviaContent type="flag" />
      {/* <GameDailyTriviaContent /> */}

      <Flex
        direction="column"
        marginTop="auto"
        marginBottom={{ base: 0, md: 4 }}
        width="100%"
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <GameTriviaButton text="Peru" flagCode="pe" />
          <GameTriviaButton text="United Arab Emirates" flagCode="ae" />
          <GameTriviaButton text="Jordan" flagCode="jo" />
          <GameTriviaButton text="Jeff Bezos" flagCode="us" />
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default GameDailyTrivia;
