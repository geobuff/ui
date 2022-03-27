import React, { FC } from "react";
import { Field } from "formik";

import {
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
} from "@chakra-ui/react";

import { FormOption } from "../../../types/form";

export interface Props extends Omit<FlexProps, "defaultValue"> {
  options: FormOption[];
  defaultValue?: FormOption;
  name?: string;
  label?: string;
  helper?: string;
}

const SelectFormField: FC<Props> = ({
  options = [],
  name,
  label,
  helper,
  defaultValue = { label: "Select a value...", value: "" },
  ...props
}) => {
  return (
    <Flex marginY={4} {...props}>
      <Field name={name}>
        {({ field, form }) => (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            {label && (
              <FormLabel htmlFor={name} fontWeight="bold">
                {label}
              </FormLabel>
            )}
            <Select
              {...field}
              id={name}
              fontSize="16px"
              fontWeight={400}
              background="#F6F6F6"
              minHeight="44px"
              borderRadius={6}
              color={"gray.600"}
              borderColor="transparent"
              _placeholder={{ color: "gray.500" }}
              _hover={{ background: "#e0e0e0" }}
              onChange={props?.onChange}
            >
              <option value={defaultValue.value}>{defaultValue.label}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            {helper && <FormHelperText marginTop={0}>{helper}</FormHelperText>}

            <FormErrorMessage fontSize="11px">
              {form.errors[name]}
            </FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </Flex>
  );
};

export default SelectFormField;
