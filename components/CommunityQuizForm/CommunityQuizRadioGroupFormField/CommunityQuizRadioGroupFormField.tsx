import {
  Flex,
  FlexProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { Field } from "formik";
import React, { FC } from "react";
import { FormSetFieldValue, FormValue } from "../../../types/form";
import TrueFalseFormField from "../../FormFields/TrueFalseFormField";

export interface Props extends FlexProps {
  name: string;
  label?: string;
  helper?: string;
  selectedValue?: FormValue;
  setFieldHelper?: FormSetFieldValue;
  direction?: "row" | "column";
}

const CommunityQuizRadioGroupFormField: FC<Props> = ({
  name,
  label = "",
  helper = "",
  selectedValue,
  setFieldHelper = () => {},
  direction = "column",
  ...props
}) => {
  const isColumn = direction === "column";

  return (
    <Flex width="100%" alignItems="center" marginY={4} {...props}>
      <Field name={name}>
        {({ form }) => (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <Flex direction={direction}>
              <Flex
                width={isColumn ? "100%" : "50%"}
                direction="column"
                paddingRight={isColumn ? 0 : 6}
              >
                <FormLabel htmlFor={name} fontWeight="bold" marginBottom={0.5}>
                  {label}
                </FormLabel>
                {!isColumn && (
                  <FormHelperText marginTop={0}>{helper}</FormHelperText>
                )}
              </Flex>
              <TrueFalseFormField
                name={name}
                label={label}
                isLabelVisible={false}
                selectedValue={selectedValue}
                setFieldHelper={setFieldHelper}
              />
            </Flex>

            {form.errors[name] ? (
              <FormErrorMessage fontSize="11px">
                {form.errors[name]}
              </FormErrorMessage>
            ) : (
              <>{isColumn && <FormHelperText>{helper}</FormHelperText>}</>
            )}
          </FormControl>
        )}
      </Field>
    </Flex>
  );
};

export default CommunityQuizRadioGroupFormField;
