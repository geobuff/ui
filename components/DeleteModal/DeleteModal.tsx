import React, { FC, useContext } from "react";

import { Alert, AlertIcon, Box, Button, Text } from "@chakra-ui/react";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import Modal from "../Modal";

export interface Props {
  isOpen?: boolean;
  header?: string;
  message?: string;
  action?: string;
  isSubmitting?: boolean;
  error?: string;
  onClose?: () => void;
  onSubmit?: () => void;
}

export const DeleteModal: FC<Props> = ({
  isOpen = false,
  header = "",
  message = "",
  action = "",
  isSubmitting = false,
  error = "",
  onClose = (): void => {},
  onSubmit = (): void => {},
}) => {
  const { t } = useContext(LanguageContext);

  const footer = (
    <>
      <Button onClick={onClose} disabled={isSubmitting}>
        {t.global.cancel}
      </Button>
      <Button
        colorScheme="red"
        onClick={onSubmit}
        disabled={isSubmitting}
        ml={3}
      >
        {action ? action : t.global.delete}
      </Button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} header={header} footer={footer}>
      <Box paddingX={6}>
        {error && (
          <Alert status="error" borderRadius={6} marginBottom={3}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Text>{message}</Text>
      </Box>
    </Modal>
  );
};
