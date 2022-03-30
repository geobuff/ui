import React, { FC } from "react";
import {
  Box,
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
} from "@chakra-ui/react";
import { Field } from "formik";
import SelectFormField from "../../FormFields/SelectFormField";
import { flagCategories } from "@geobuff/flags";
import { flags } from "@geobuff/flags";

export interface Props extends FlexProps {
  name: string;
  label?: string;
  value: number | string;
  placeholder?: string;
  isChecked?: boolean;
  hasFlagAnswers?: boolean;
  flagAnswerCategory?: string;
  onChangeCorrectAnswer?: (value: number | string) => void;
  onChangeFlagCode?: (value: string) => void;
}

// TODO: refactor out names and flagCodes
const CommunityQuizAnswersField: FC<Props> = ({
  name,
  label,
  placeholder = "Enter answer...",
  value,
  isChecked = false,
  hasFlagAnswers = false,
  flagAnswerCategory,
  onChangeCorrectAnswer = () => {}, // TODO: give new name
  onChangeFlagCode = () => {},
  ...props
}) => {
  // TODO: move common
  const flagOptions = flagCategories?.map(({ key, label }) => ({
    label,
    value: key,
  }));

  const getFlagsByCategory = (category: string) => {
    if (category === "world") {
      return Object.keys(flags).filter((flag) => flag.length === 2);
    }

    return Object.keys(flags).filter(
      (flag) => flag.slice(0, 2) === category && flag.length !== 2
    );
  };

  return (
    <Flex
      direction="column"
      width="100%"
      flex={1}
      paddingX={3}
      paddingY={2}
      borderWidth={2}
      borderColor={isChecked ? "green.500" : "transparent"}
      borderRadius={8}
      transition="150ms ease-in-out"
      {...props}
    >
      <FormLabel
        htmlFor={"answerOne"}
        fontWeight="bold"
        color={isChecked && "green.500"}
      >
        {label}
      </FormLabel>

      <Flex alignItems="center">
        <Radio
          value={1}
          isChecked={isChecked}
          onChange={() => onChangeCorrectAnswer(value)}
          colorScheme="green"
          marginRight={3}
        />

        {hasFlagAnswers && (
          <Flex maxWidth="150px" alignItems="center">
            <Field name={`${name}.flagCode`}>
              {({ form }) => (
                <FormControl>
                  <SelectFormField
                    name={`${name}.flagCode`}
                    defaultValue={{ label: "Flag code", value: "" }}
                    minWidth={{ base: "100%", md: "130px" }}
                    isInvalid={
                      (!isChecked &&
                        form.errors.answers &&
                        name.includes("0")) ||
                      (!isChecked && form.errors.answers && name.includes("1"))
                    }
                    options={getFlagsByCategory(
                      flagAnswerCategory
                    ).map((option) => ({ label: option, value: option }))}
                    onChange={({ target }) => onChangeFlagCode(target.value)}
                  />
                </FormControl>
              )}
            </Field>
          </Flex>
        )}

        <Field name={`${name}.text`}>
          {({ field, form }) => (
            <FormControl
              isInvalid={
                (!isChecked && form.errors.answers && name.includes("0")) ||
                (!isChecked && form.errors.answers && name.includes("1"))
              }
            >
              <Input
                {...field}
                id={name}
                type="text"
                placeholder={placeholder}
                size="lg"
                fontSize="16px"
                fontWeight={400}
                background="#F6F6F6"
                color={isChecked && "green.500"}
                borderRadius={6}
                ml={hasFlagAnswers ? 2 : 0}
                width="100%"
                _placeholder={{ color: "gray.500" }}
                _hover={{ background: "#e0e0e0" }}
              />
            </FormControl>
          )}
        </Field>
      </Flex>
    </Flex>
  );
};

export default CommunityQuizAnswersField;
