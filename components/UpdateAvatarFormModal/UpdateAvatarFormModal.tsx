import React, { FC } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import {
  Box,
  FormControl,
  Flex,
  Button,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react";

import Modal from "../Modal";
import AvatarSelectContainer from "../../containers/AvatarSelectContainer";
import ErrorAlertBanner from "../ErrorAlertBanner";
import { UpdateAvatarFormSubmit } from "../../types/update-avatar-form-submit";

const validationSchema = Yup.object().shape({
  avatarId: Yup.number().required("Please select an avatar."),
});

interface Props {
  avatarId?: number;
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (values: UpdateAvatarFormSubmit) => void;
  isSubmitting?: boolean;
  isNotchedIphone?: boolean;
  error?: string;
}

const UpdateAvatarFormModal: FC<Props> = ({
  avatarId = 0,
  isOpen = false,
  onClose = (): void => {},
  onSubmit = (): void => {},
  isSubmitting = false,
  isNotchedIphone = false,
  error = "",
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <Formik
      enableReinitialize
      initialValues={{
        avatarId: avatarId?.toString(),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }): React.ReactNode => (
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
                  {"Update Avatar"}
                </Heading>

                <Flex marginY={6}>
                  <Field name="avatarId">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={
                          form.errors.avatarId && form.touched.avatarId
                        }
                      >
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
              </Flex>

              <Flex justifyContent="flex-end">
                <Flex
                  direction="row"
                  marginTop="44px"
                  marginBottom={isNotchedIphone ? 9 : 6}
                  marginRight={6}
                >
                  <Button marginRight={3} width="100%" onClick={onClose}>
                    {"Cancel"}
                  </Button>
                  <Button
                    colorScheme="green"
                    width="100%"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    {"Update"}
                  </Button>
                  <ErrorAlertBanner error={error} />
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Form>
      )}
    </Formik>
  </Modal>
);

export default UpdateAvatarFormModal;
