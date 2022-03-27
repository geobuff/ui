import React, { FC } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
} from "@chakra-ui/react";
import { Field } from "formik";

export interface Props {
  label?: string;
  value: number | string;
  placeholder?: string;
  isChecked?: boolean;
  hasFlagAnswers?: boolean;
  onChange?: (value: number | string) => void;
}

// TODO: refactor out names and flagCodes
const CommunityQuizAnswersField: FC<Props> = ({
  label,
  placeholder = "Enter answer...",
  value,
  isChecked = false,
  hasFlagAnswers = false,
  onChange = () => {},
}) => {
  return (
    <Flex
      direction="column"
      width="100%"
      flex={1}
      paddingX={2.5}
      paddingY={2}
      borderWidth={isChecked && 2}
      borderColor={isChecked && "green.500"}
      borderRadius={8}
    >
      <FormLabel
        htmlFor={"answerOne"}
        fontWeight="bold"
        color={isChecked && "green.500"}
      >
        {label}
      </FormLabel>

      <Flex>
        <Radio
          value={1}
          isChecked={isChecked}
          onChange={() => onChange(value)}
          colorScheme="green"
          marginRight={3}
        />

        {hasFlagAnswers && (
          <Flex maxWidth="150px">
            <Field name="answerOneFlagCode">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.answerOneFlagCode &&
                    form.touched.answerOneFlagCode
                  }
                >
                  <Input
                    {...field}
                    id="answerOneFlagCode"
                    type="text"
                    placeholder="Flag code..."
                    size="lg"
                    fontSize="16px"
                    fontWeight={400}
                    background="#F6F6F6"
                    borderRadius={6}
                    _placeholder={{ color: "gray.500" }}
                    _hover={{ background: "#e0e0e0" }}
                  />
                  <Box position="absolute" top="38px" left="2px">
                    <FormErrorMessage fontSize="11px">
                      {form.errors.answerOneFlagCode}
                    </FormErrorMessage>
                  </Box>
                </FormControl>
              )}
            </Field>
          </Flex>
        )}

        <Field name="answerOneText">
          {({ field, form }) => (
            <FormControl
              isInvalid={
                form.errors.answerOneText && form.touched.answerOneText
              }
            >
              <Input
                {...field}
                width="100%"
                id="answerOneText"
                type="text"
                placeholder={placeholder}
                size="lg"
                fontSize="16px"
                fontWeight={400}
                background="#F6F6F6"
                borderRadius={6}
                ml={hasFlagAnswers ? 2 : 0}
                _placeholder={{ color: "gray.500" }}
                _hover={{ background: "#e0e0e0" }}
              />
              <Box position="absolute" top="42px" left="2px">
                <FormErrorMessage fontSize="11px">
                  {form.errors.answerOneText}
                </FormErrorMessage>
              </Box>
            </FormControl>
          )}
        </Field>
      </Flex>
    </Flex>
  );
};

export default CommunityQuizAnswersField;
