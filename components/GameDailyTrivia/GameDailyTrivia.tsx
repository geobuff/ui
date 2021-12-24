import React, { FC } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import GameDailyTriviaHeader from "./GameDailyTriviaHeader";
import CustomFlag from "../CustomFlag";
import GameTriviaButton from "../GameTriviaButton";

export interface Props {}

const GameDailyTrivia: FC<Props> = () => {
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

      <Heading color="white">
        {"If I’m visiting the ancient city of Petra, which country am I in?"}
      </Heading>
      <Flex
        width="100%"
        direction="column"
        marginTop="auto"
        marginBottom={{ base: 0, md: 4 }}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <GameTriviaButton text="Peru" flagCode="pe" />
          <GameTriviaButton text="United Arab Emirates" flagCode="ae" />
          <GameTriviaButton text="Jordan" flagCode="jo" />
          <GameTriviaButton text="Jeff Bezos" flagCode="sz" />
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default GameDailyTrivia;
