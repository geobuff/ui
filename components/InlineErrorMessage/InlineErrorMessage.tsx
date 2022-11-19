import React, { FC } from "react";

import { WarningTwoIcon } from "@chakra-ui/icons";
import { Flex, FlexProps, Text } from "@chakra-ui/react";

export interface Props extends FlexProps {
  message: string;
}

const InlineErrorMessage: FC<Props> = ({ message, ...props }) => {
  return (
    <Flex alignItems="center" {...props}>
      <WarningTwoIcon height={3} width={3} color="red.500" />
      <Text color="red.500" fontSize="sm" fontWeight="medium" marginLeft={2}>
        {message}
      </Text>
    </Flex>
  );
};

export default InlineErrorMessage;
