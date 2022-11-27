import React, { FC, useContext, useEffect, useState } from "react";

import {
  Flex,
  FlexProps,
  FormControl,
  FormLabel,
  Input,
  Radio,
} from "@chakra-ui/react";
import { Field } from "formik";

import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";

import axiosClient from "../../../axios";
import SelectFormField from "../../FormFields/SelectFormField";

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

const CommunityQuizAnswersField: FC<Props> = ({
  name,
  label,
  placeholder = "",
  value,
  isChecked = false,
  hasFlagAnswers = false,
  flagAnswerCategory,
  onChangeCorrectAnswer = () => {},
  onChangeFlagCode = () => {},
  ...props
}) => {
  const { t } = useContext(LanguageContext);

  const [flagEntries, setFlagEntries] = useState([]);
  const [isFlagEntriesLoading, setIsFlagEntriesLoading] = useState(false);

  useEffect(() => {
    if (flagAnswerCategory) {
      setIsFlagEntriesLoading(true);
      axiosClient
        .get(`flags/${flagAnswerCategory}`)
        .then((response) => setFlagEntries(response.data))
        .finally(() => setIsFlagEntriesLoading(false));
    }
  }, [flagAnswerCategory]);

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
        htmlFor="answerOne"
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
                    defaultValue={{
                      label: t.communityQuizAnswersField.flagCodeLabel,
                      value: "",
                    }}
                    minWidth={{ base: "100%", md: "130px" }}
                    isInvalid={
                      (!isChecked &&
                        form.errors.answers &&
                        name.includes("0")) ||
                      (!isChecked && form.errors.answers && name.includes("1"))
                    }
                    options={
                      !isFlagEntriesLoading &&
                      flagEntries &&
                      flagEntries.map((entry) => ({
                        label: entry.code,
                        value: entry.code,
                      }))
                    }
                    onChange={({ target }) => onChangeFlagCode(target.value)}
                  />
                </FormControl>
              )}
            </Field>
          </Flex>
        )}

        <Field name={`${name}.text`}>
          {({ field }) => (
            <FormControl>
              <Input
                {...field}
                id={name}
                type="text"
                placeholder={
                  placeholder
                    ? placeholder
                    : t.communityQuizAnswersField.placeholder
                }
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
