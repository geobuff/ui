import React, { FC } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { Field } from "formik";
import CountrySelect from "../../CountrySelect";
import RegisterFormBackButton from "../RegisterFormBackButton";
import ProfileUserAvatar from "../../ProfileUserAvatar";

const usernameHelperText =
  "Pick a unique name for your avatar. If you change your mind you can change this later in your profile.";

export interface Props {
  values: any;
  isSubmitting: boolean;
  isValidating: boolean;
  isValidUsername: boolean;
  onCheckUsernameValidity: (username: string) => void;
  onPreviousStep: () => void;
}

const RegisterFormStepThree: FC<Props> = ({
  values,
  isSubmitting = false,
  isValidating = false,
  isValidUsername = false,
  onCheckUsernameValidity = () => {},
  onPreviousStep = () => {},
}) => {
  const hasUsernameValue = values?.username;
  const isDisabled = isValidating || (hasUsernameValue && !isValidUsername);

  return (
    <Box>
      <RegisterFormBackButton onClick={onPreviousStep}>
        {"Pick Your Username"}
      </RegisterFormBackButton>
      <Flex direction="column" marginY={6}>
        <ProfileUserAvatar
          shape="square"
          height={100}
          width={100}
          primaryImageUrl="/commando-one-secondary.svg"
          secondaryImageUrl="/commando-one-primary.svg"
          hasBorder={false}
        />
        <Heading mx="auto" mb={2} size="md">
          {"Sarg"}
        </Heading>
        <Field name="username">
          {({ field, form }): React.ReactNode => (
            <FormControl
              isInvalid={form.errors.username && form.touched.username}
            >
              <FormLabel fontWeight="bold" htmlFor="username">
                {"Username"}
              </FormLabel>
              <InputGroup>
                <Input
                  {...field}
                  id="username"
                  autoComplete="off"
                  placeholder="Enter username..."
                  type="text"
                  size="lg"
                  height="40px"
                  fontSize="16px"
                  background="#F6F6F6"
                  borderRadius={6}
                  onBlur={() => onCheckUsernameValidity(values?.username)}
                  _placeholder={{ color: "gray.500" }}
                  _hover={{ background: "#e0e0e0" }}
                />
                <InputRightElement>
                  {isValidating && (
                    <Spinner
                      size="sm"
                      color="blue.500"
                      marginRight={2}
                      marginTop={1}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
              {form.errors.username && form.touched.username ? (
                <FormErrorMessage fontSize="12px">
                  {form.errors.username}
                </FormErrorMessage>
              ) : (
                <FormHelperText fontSize="12px" lineHeight={"1.45"}>
                  {usernameHelperText}
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
            >
              <FormLabel htmlFor="countryCode" fontWeight="bold">
                {"Country"}
              </FormLabel>

              <CountrySelect fieldProps={field} />
              <FormErrorMessage fontSize="12px">
                {form.errors.countryCode}
              </FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Flex>
      <Button
        size="lg"
        colorScheme="green"
        width="100%"
        type={isValidUsername ? "submit" : "button"}
        isDisabled={isDisabled}
        isLoading={isSubmitting}
      >
        {"Create Account"}
      </Button>
    </Box>
  );
};

export default RegisterFormStepThree;
