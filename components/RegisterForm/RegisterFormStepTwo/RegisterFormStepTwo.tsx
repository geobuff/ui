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
import RegisterFormBackButton from "../RegisterFormBackButton";

export interface Props {
  onPreviousStep: () => void;
  onNextStep: () => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const RegisterFormStepTwo: FC<Props> = ({
  setFieldValue = () => {},
  onPreviousStep = () => {},
  onNextStep = () => {},
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
              <FormErrorMessage fontSize="11px">
                {form.errors.avatarId}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Flex>
      <Button
        size="lg"
        colorScheme="green"
        width="100%"
        type="button"
        onClick={onNextStep}
      >
        {"Next"}
      </Button>
    </Box>
  );
};

export default RegisterFormStepTwo;
