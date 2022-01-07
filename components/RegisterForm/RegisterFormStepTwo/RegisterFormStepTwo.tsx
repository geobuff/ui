import React, { FC } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  VisuallyHidden,
} from "@chakra-ui/react";
import { Field } from "formik";
import AvatarSelectContainer from "../../../containers/AvatarSelectContainer";

export interface Props {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

const RegisterFormStepTwo: FC<Props> = ({ setFieldValue = () => {} }) => {
  return (
    <Box>
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
