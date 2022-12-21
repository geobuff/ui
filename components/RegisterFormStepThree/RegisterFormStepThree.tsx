import React, { ChangeEvent, FC, useContext, useState } from "react";

import {
  Button,
  Checkbox,
  Fade,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { Field } from "formik";

import { LanguageContext } from "../../contexts/LanguageContext";

import useAvatars from "../../hooks/UseAvatars";

import CountrySelect from "../CountrySelect";
import ProfileUserAvatar from "../ProfileUserAvatar";
import { RegisterFormBackButton } from "../RegisterFormBackButton/RegisterFormBackButton";

export interface Props {
  values: any;
  isSubmitting: boolean;
  isValidating: boolean;
  isValidUsername: boolean;
  onCheckUsernameValidity: (username: string) => void;
  onPreviousStep: () => void;
}

export const RegisterFormStepThree: FC<Props> = ({
  values,
  isSubmitting = false,
  isValidating = false,
  isValidUsername = false,
  onCheckUsernameValidity = () => {},
  onPreviousStep = () => {},
}) => {
  const [hasAgreedToGeoTerms, setHasAgreedToGeoTerms] = useState(false);
  const { avatars } = useAvatars();
  const { t } = useContext(LanguageContext);

  const currentAvatar = avatars?.find(
    (x) => x.id === parseInt(values?.avatarId)
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setHasAgreedToGeoTerms(event.target.checked);

  return (
    <Fade in>
      <RegisterFormBackButton onClick={onPreviousStep}>
        {t.registerFormStepThree.pickYourUsername}
      </RegisterFormBackButton>
      <Flex direction="column" marginY={6}>
        <ProfileUserAvatar
          shape="square"
          height={100}
          width={100}
          primaryImageUrl={currentAvatar.secondaryImageUrl}
          secondaryImageUrl={currentAvatar.primaryImageUrl}
          hasBorder={false}
        />
        <Heading mx="auto" mb={2} size="md">
          {currentAvatar.name}
        </Heading>
        <Field name="username">
          {({ field, form }): React.ReactNode => (
            <FormControl
              isInvalid={form.errors.username && form.touched.username}
            >
              <FormLabel fontWeight="bold" htmlFor="username">
                {t.global.username}
              </FormLabel>
              <Input
                {...field}
                id="username"
                isDisabled={isSubmitting || isValidating}
                autoComplete="off"
                placeholder={t.global.usernamePlaceholder}
                type="text"
                size="lg"
                height="40px"
                fontSize="16px"
                background="#F6F6F6"
                borderRadius={6}
                _disabled={{ opacity: 0.2 }}
                _placeholder={{ color: "gray.500" }}
                _hover={{ background: "#e0e0e0" }}
              />

              {form.errors.username && form.touched.username ? (
                <FormErrorMessage fontSize="12px">
                  {form.errors.username}
                </FormErrorMessage>
              ) : (
                <FormHelperText fontSize="12px" lineHeight={"1.45"}>
                  {t.registerFormStepThree.usernameExplainer}
                </FormHelperText>
              )}
            </FormControl>
          )}
        </Field>
      </Flex>

      <Flex marginY={6}>
        <Field name="countryCode">
          {({ field, form }): React.ReactNode => (
            <FormControl
              isInvalid={form.errors.countryCode && form.touched.countryCode}
              isDisabled={isSubmitting || isValidating}
            >
              <FormLabel htmlFor="countryCode" fontWeight="bold">
                {t.global.country}
              </FormLabel>

              <CountrySelect
                fieldProps={field}
                isDisabled={isSubmitting || isValidating}
              />
              {form.errors.countryCode && form.touched.countryCode ? (
                <FormErrorMessage fontSize="12px">
                  {form.errors.countryCode}
                </FormErrorMessage>
              ) : (
                <FormHelperText fontSize="12px" lineHeight={"1.45"}>
                  {t.registerFormStepThree.countryExplainer}
                </FormHelperText>
              )}
            </FormControl>
          )}
        </Field>
      </Flex>

      <Checkbox
        color="#276f86"
        marginLeft={1}
        marginY={4}
        onChange={handleChange}
      >
        <Text color="gray.500" fontSize="small">
          {t.registerFormStepThree.termsMessage}
          <Link
            marginX={1}
            fontWeight="medium"
            href="/terms-of-service"
            isExternal
          >
            {t.global.termsOfService}
          </Link>
          {"&"}
          <Link
            marginLeft={1}
            fontWeight="medium"
            href="/privacy-policy"
            isExternal
          >
            {t.global.privacyPolicy}
          </Link>
          {"."}
        </Text>
      </Checkbox>

      <Button
        size="lg"
        colorScheme="green"
        width="100%"
        type={isValidUsername ? "submit" : "button"}
        isDisabled={isValidating || !hasAgreedToGeoTerms}
        isLoading={isSubmitting}
        onClick={() =>
          values?.username && onCheckUsernameValidity(values?.username)
        }
      >
        {t.registerFormStepThree.createAccount}
      </Button>
    </Fade>
  );
};
