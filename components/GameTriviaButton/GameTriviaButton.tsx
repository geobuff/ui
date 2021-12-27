import React, { FC } from "react";
import { Box, Button, ButtonProps, Flex } from "@chakra-ui/react";
import { getFlagUrl } from "@geobuff/flags";

import CustomFlag from "../CustomFlag";

export interface Props extends ButtonProps {
  text: string | number;
  flagCode?: string;
}

const GameTriviaButton: FC<Props> = ({ flagCode, text, ...props }) => (
  <Button
    paddingY={8}
    paddingX={6}
    backgroundColor="#236175"
    color="white"
    size="lg"
    _hover={{
      backgroundColor: "#1d5061",
    }}
    {...props}
  >
    <Flex alignItems="center" textAlign="center" width="100%">
      {flagCode && (
        <Box marginRight={5}>
          <CustomFlag url={getFlagUrl(flagCode)} />
        </Box>
      )}
      {text}
    </Flex>
  </Button>
);

export default GameTriviaButton;
