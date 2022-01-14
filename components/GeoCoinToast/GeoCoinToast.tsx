import React, { FC } from "react";
import Lottie from "react-lottie-player";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import animationData from "../../lotties/coin-spin.json";

export interface Props {
  onClose: () => void;
  increase: number;
  color?: "yellow" | "blue";
}

const GeoCoinToast: FC<Props> = ({
  onClose = () => {},
  increase = 1,
  color = "yellow",
}) => {
  return (
    <Flex
      background={color === "blue" ? "blue.500" : "yellow.100"}
      color={color === "blue" ? "white" : "yellow.700"}
      fontWeight="medium"
      borderRadius="6px"
      padding={1}
    >
      <Flex padding={2}>
        <Lottie
          loop
          animationData={animationData}
          play
          style={{ width: "24px", height: "24px" }}
        />
        <Text marginLeft={2}>{`${increase} GeoCoin${
          increase > 1 ? "s" : ""
        } added to your account.`}</Text>
      </Flex>
      <IconButton
        marginLeft={-1}
        onClick={onClose}
        variant="ghost"
        height="24px"
        minWidth="24px"
        borderRadius="4px"
        _hover={{ backgroundColor: "yellow.200" }}
        padding={0}
        icon={<CloseIcon height="9px" width="9px" />}
        aria-label="close toast"
      />
    </Flex>
  );
};

export default GeoCoinToast;
