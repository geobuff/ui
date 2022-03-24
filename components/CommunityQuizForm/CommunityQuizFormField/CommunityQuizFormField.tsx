import React, { FC } from "react";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FormValues } from "../CommunityQuizForm";
import { Field } from "formik";

export interface Props {
  values?: FormValues;
}

export interface FormFieldProps {
  name: string;
  label: string;
  helper?: string;
  placeholder: string;
}
const CommunityQuizFormField: FC<FormFieldProps> = ({
  name,
  label,
  helper,
  placeholder,
}) => (
  <Flex key={name} width="100%" alignItems="center" marginY={4}>
    <Field name={name}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <Flex>
            <Flex width="50%" direction="column">
              <FormLabel htmlFor={name} fontWeight="bold" marginBottom={0.5}>
                {label}
              </FormLabel>
              <FormHelperText marginTop={0}>{helper}</FormHelperText>
            </Flex>
            <Input
              {...field}
              id={name}
              type="text"
              placeholder={placeholder}
              size="lg"
              fontSize="16px"
              fontWeight={400}
              background="#F6F6F6"
              borderRadius={6}
              width="50%"
              _placeholder={{ color: "gray.500" }}
              _hover={{ background: "#e0e0e0" }}
            />
          </Flex>
          <FormErrorMessage fontSize="11px">
            {form.errors[name]}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  </Flex>
);

export default CommunityQuizFormField;
