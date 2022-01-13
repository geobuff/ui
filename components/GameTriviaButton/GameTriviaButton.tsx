import React, { FC } from "react";
import {
  Box,
  Button,
  ButtonProps,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { getFlagUrl } from "@geobuff/flags";

import CustomFlag from "../CustomFlag";

const getStylesByStatus = (status: TriviaButtonStatus) => {
  switch (status) {
    case "correct":
      return {
        fontWeight: "bold",
        backgroundColor: "green.500",
        boxShadow: "0px 0px 8px 3px rgba(39, 174, 96, 0.5);",
        _hover: {
          backgroundColor: "green.500",
        },
      };
    case "incorrect":
      return {
        backgroundColor: "red.500",
        boxShadow: "0px 0px 8px 3px rgba(226, 79, 79, 0.5);",
        _hover: {
          backgroundColor: "red.500",
        },
      };
    case "outlined":
      return {
        fontWeight: "bold",
        boxShadow:
          "inset 0px 0px 0px 2px #27ae60, 0px 0px 8px 3px rgb(39 174 96 / 50%)",
        _hover: {},
      };

    default:
      return {};
  }
};

export type TriviaButtonStatus = "correct" | "incorrect" | "outlined" | "idle";

export interface Props extends ButtonProps {
  text: string | number;
  status?: TriviaButtonStatus;
  flagCode?: string;
}

const GameTriviaButton: FC<Props> = ({
  flagCode,
  status = "idle",
  text,
  ...props
}) => {
  const buttonStyles = getStylesByStatus(status);

  return (
    <Button
      paddingY={{ base: 6, md: 8 }}
      paddingX={{ base: 5, md: 6 }}
      backgroundColor="#236175"
      borderRadius={12}
      color="white"
      transition="all 400ms ease-in-out"
      fontSize={{ base: "sm", md: "lg" }}
      _hover={{
        backgroundColor: "#1d5061",
      }}
      {...buttonStyles}
      {...props}
    >
      <Flex alignItems="center" textAlign="center" width="100%">
        {flagCode && (
          <Box marginRight={4}>
            <CustomFlag url={getFlagUrl(flagCode)} />
          </Box>
        )}
        {text}
      </Flex>
    </Button>
  );
};

export default GameTriviaButton;
