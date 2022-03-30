import React, { FC, Key } from "react";
import { Field } from "formik";

import {
  FormControl,
  FormLabel,
  HStack,
  Text,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import RadioButton from "../../RadioButton";
import { FormOption, FormValue } from "../../../types/form";

export interface Props {
  name: string;
  label?: string;
  options: FormOption[];
  selectedValue?: FormValue;
  onChange: (value: FormValue) => void;
}

const RadioGroupFormField: FC<Props> = ({
  name,
  label,
  options = [],
  selectedValue,
  onChange = () => {},
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    value: selectedValue,
    name,
    onChange: (value: number) => onChange(value),
  });

  const radioGroup = getRootProps();

  return (
    <VStack>
      <Field name={name}>
        {({ form }) => (
          <FormControl isInvalid={form.errors.typeId && form.touched.typeId}>
            {label && (
              <FormLabel htmlFor={name} fontWeight="bold">
                {label}
              </FormLabel>
            )}
            <HStack name={name} spacing={3} minHeight="50px" {...radioGroup}>
              {!options.length ? (
                <Text width="347px" textAlign="center" color="gray.500">
                  {"Loading Types.."}
                </Text>
              ) : (
                options.map(({ label, value }) => {
                  //@ts-ignore
                  const radio = getRadioProps({ value });
                  return (
                    <RadioButton key={value as Key} radioProps={radio}>
                      {label}
                    </RadioButton>
                  );
                })
              )}
            </HStack>
          </FormControl>
        )}
      </Field>
    </VStack>
  );
};

export default RadioGroupFormField;
