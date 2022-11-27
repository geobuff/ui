import React, { FC, useContext } from "react";

import {
  Box,
  Flex,
  FlexProps,
  FormLabel,
  HStack,
  Text,
} from "@chakra-ui/react";

import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";

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
  const { t } = useContext(LanguageContext);

  return (
    <Flex width="100%" {...props}>
      <Box width="100%">
        <FormLabel htmlFor="answerOneText" fontWeight="bold">
          {t.communityQuizHasAnswersField.label}
        </FormLabel>
        <Text color="gray.500" fontSize="sm" mt={2} mr={6}>
          {t.communityQuizHasAnswersField.helper}
        </Text>
      </Box>

      <HStack spacing={3}>
        <RadioButton
          radioProps={{
            isChecked: !isEnabled,
            onChange: () => onChange(false),
          }}
        >
          {t.global.no}
        </RadioButton>
        <RadioButton
          radioProps={{
            isChecked: isEnabled,
            onChange: () => onChange(true),
          }}
        >
          {t.global.yes}
        </RadioButton>
      </HStack>
    </Flex>
  );
};

export default CommunityQuizHasAnswersField;
