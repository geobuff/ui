import React, { FC, useContext } from "react";

import { Modal } from "@geobuff/buff-ui/components";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { LanguageContext } from "../../contexts/LanguageContext";

import { UpdateUserFormSubmit } from "../../types/update-user-form-submit";
import { UserDto } from "../../types/user-dto";
import CountrySelect from "../CountrySelect";

interface Props {
  user?: UserDto;
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (values: UpdateUserFormSubmit) => void;
  isSubmitting?: boolean;
  isNotchedIphone?: boolean;
}

const UpdateUserFormModal: FC<Props> = ({
  user = null,
  isOpen = false,
  onClose = (): void => {},
  onSubmit = (values: UpdateUserFormSubmit): void => {},
  isSubmitting = false,
  isNotchedIphone = false,
}) => {
  const { t } = useContext(LanguageContext);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t.validations.usernameRequired)
      .min(3, t.validations.usernameMin)
      .max(20, t.validations.usernameMax)
      .matches(/^\S*$/, t.validations.usernameMatch),
    email: Yup.string()
      .required(t.validations.emailRequired)
      .email(t.validations.emailValid),
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        enableReinitialize
        initialValues={{
          username: user?.username,
          email: user?.email,
          countryCode: user?.countryCode,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(): React.ReactNode => (
          <Form style={{ height: "100%" }}>
            <Box height="100%">
              <Flex
                direction="column"
                justifyContent="space-between"
                height="100%"
              >
                <Flex direction="column" marginX={6}>
                  <Heading
                    marginTop={6}
                    marginBottom={4}
                    fontSize={{ base: "24px", md: "32px" }}
                    fontWeight="bold"
                  >
                    {t.updateUserFormModal.title}
                  </Heading>

                  <Flex marginY={3}>
                    <Field name="username">
                      {({ field, form }): React.ReactNode => (
                        <FormControl
                          isInvalid={
                            form.errors.username && form.touched.username
                          }
                        >
                          <FormLabel fontWeight="bold" htmlFor="username">
                            {t.global.username}
                          </FormLabel>
                          <Input
                            {...field}
                            id="username"
                            autoComplete="off"
                            type="text"
                            size="lg"
                            height="40px"
                            fontSize="16px"
                            background="#F6F6F6"
                            borderRadius={6}
                            _placeholder={{ color: "gray.500" }}
                            _hover={{ background: "#e0e0e0" }}
                          />
                          <Box position="absolute" top="68px" left="2px">
                            <FormErrorMessage fontSize="11px">
                              {form.errors.username}
                            </FormErrorMessage>
                          </Box>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <Flex marginY={3}>
                    <Field name="email">
                      {({ field, form }): React.ReactNode => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel htmlFor="email" fontWeight="bold">
                            {t.global.email}
                          </FormLabel>
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            size="lg"
                            height="40px"
                            fontSize="16px"
                            background="#F6F6F6"
                            borderRadius={6}
                            _placeholder={{ color: "gray.500" }}
                            _hover={{ background: "#e0e0e0" }}
                          />
                          <Box position="absolute" top="68px" left="2px">
                            <FormErrorMessage fontSize="11px">
                              {form.errors.email}
                            </FormErrorMessage>
                          </Box>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <Flex marginY={3}>
                    <Field name="countryCode">
                      {({ field, form }): React.ReactNode => (
                        <FormControl>
                          <FormLabel htmlFor="countryCode" fontWeight="bold">
                            {t.global.country}
                          </FormLabel>
                          <CountrySelect fieldProps={field} />
                          <Box position="absolute" top="68px" left="2px">
                            <FormErrorMessage fontSize="11px">
                              {form.errors.countryCode}
                            </FormErrorMessage>
                          </Box>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                </Flex>

                <Flex justifyContent="flex-end">
                  <Flex
                    direction="row"
                    marginTop="44px"
                    marginBottom={isNotchedIphone ? 9 : 6}
                    marginRight={6}
                  >
                    <Button marginRight={3} width="100%" onClick={onClose}>
                      {t.global.cancel}
                    </Button>
                    <Button
                      colorScheme="green"
                      width="100%"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      {t.global.update}
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateUserFormModal;
