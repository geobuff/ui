import React, { FC, useContext } from "react";
import {
  Button,
  Fade,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  VisuallyHidden,
} from "@chakra-ui/react";
import { Field } from "formik";

import AvatarSelectContainer from "../../../containers/AvatarSelectContainer";
import RegisterFormBackButton from "../RegisterFormBackButton";
import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";

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
  const { t } = useContext(LanguageContext);

  return (
    <Fade in>
      <RegisterFormBackButton onClick={onPreviousStep}>
        {t.registerFormStepTwo.selectYourAvatar}
      </RegisterFormBackButton>

      <Flex marginY={6}>
        <Field name="avatarId">
          {({ field, form }): React.ReactNode => (
            <FormControl
              isInvalid={form.errors.avatarId && form.touched.avatarId}
            >
              <VisuallyHidden>
                <FormLabel htmlFor="avatarId">{t.global.avatar}</FormLabel>
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
        {t.global.next}
      </Button>
    </Fade>
  );
};

export default RegisterFormStepTwo;
