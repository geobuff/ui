import React, { FC } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  VisuallyHidden,
} from "@chakra-ui/react";
import { Field } from "formik";
import AvatarSelectContainer from "../../../containers/AvatarSelectContainer";
import ArrowLeft from "../../../Icons/ArrowLeft";
import RegisterFormBackButton from "../RegisterFormBackButton";

export interface Props {
  onPreviousStep: () => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const RegisterFormStepTwo: FC<Props> = ({
  setFieldValue = () => {},
  onPreviousStep = () => {},
}) => {
  return (
    <Box>
      <RegisterFormBackButton onClick={onPreviousStep}>
        {"Select Your Avatar"}
      </RegisterFormBackButton>

      <Flex marginY={6}>
        <Field name="avatarId">
          {({ field, form }): React.ReactNode => (
            <FormControl
              isInvalid={form.errors.avatarId && form.touched.avatarId}
            >
              <VisuallyHidden>
                <FormLabel htmlFor="avatarId">{"Avatar"}</FormLabel>
              </VisuallyHidden>

              <AvatarSelectContainer
                fieldProps={field}
                setFieldValue={setFieldValue}
              />
              <Box position="absolute" top="68px" left="2px">
                <FormErrorMessage fontSize="11px">
                  {form.errors.avatarId}
                </FormErrorMessage>
              </Box>
            </FormControl>
          )}
        </Field>
      </Flex>
    </Box>
  );
};

export default RegisterFormStepTwo;
