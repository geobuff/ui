import React, { FC } from "react";

import {
  Box,
  Flex,
  FlexProps,
  FormLabel,
  HStack,
  Text,
} from "@chakra-ui/react";

import RadioButton from "../../RadioButton";

export interface Props extends Omit<FlexProps, "onChange"> {
  onChange: (value: boolean) => void;
  isEnabled: boolean;
}

const CommunityQuizHasAnswersField: FC<Props> = ({
  isEnabled = false,
  onChange = () => {},
  ...props
}) => {
  return (
    <Flex width="100%" {...props}>
      <Box width="100%">
        <FormLabel htmlFor="answerOneText" fontWeight="bold">
          {"Do answers have flags?"}
        </FormLabel>
        <Text color="gray.500" fontSize="sm" mt={2} mr={6}>
          {"Enables answer buttons to contain flag images"}
        </Text>
      </Box>

      <HStack spacing={3}>
        <RadioButton
          radioProps={{
            isChecked: !isEnabled,
            onChange: () => onChange(false),
          }}
        >
          {"No"}
        </RadioButton>
        <RadioButton
          radioProps={{
            isChecked: isEnabled,
            onChange: () => onChange(true),
          }}
        >
          {"Yes"}
        </RadioButton>
      </HStack>
    </Flex>
  );
};

export default CommunityQuizHasAnswersField;
