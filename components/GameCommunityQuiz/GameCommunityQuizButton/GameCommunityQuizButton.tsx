import React, { FC } from "react";
import { Box, Button, ButtonProps, Flex } from "@chakra-ui/react";

import CustomFlag from "../../CustomFlag";
import useFlagGroups from "../../../hooks/UseFlagGroups";

const getStylesByStatus = (status: CommunityQuizButtonStatus) => {
  switch (status) {
    case "correct":
      return {
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
        boxShadow:
          "inset 0px 0px 0px 2px #27ae60, 0px 0px 8px 3px rgb(39 174 96 / 50%)",
        _hover: {},
      };

    default:
      return {};
  }
};

export type CommunityQuizButtonStatus =
  | "correct"
  | "incorrect"
  | "outlined"
  | "idle";

export interface Props extends ButtonProps {
  text: string | number;
  isCondensed: boolean;
  status?: CommunityQuizButtonStatus;
  flagCode?: string;
}

const GameCommunityQuizButton: FC<Props> = ({
  flagCode,
  isCondensed = false,
  status = "idle",
  text,
  ...props
}) => {
  const buttonStyles = getStylesByStatus(status);
  const { getFlagUrlByCode } = useFlagGroups();

  return (
    <Button
      paddingY={isCondensed ? 2 : { base: 6, md: 8 }}
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
            <CustomFlag
              url={getFlagUrlByCode(flagCode)}
              code={user.countryCode}
            />
          </Box>
        )}
        {text}
      </Flex>
    </Button>
  );
};

export default GameCommunityQuizButton;
