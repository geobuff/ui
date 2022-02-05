import { Alert, AlertIcon, Box, Button, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import Modal from "../Modal";

export interface Props {
  isOpen?: boolean;
  possessive?: string;
  isSubmitting?: boolean;
  error?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
}

const DeleteAccountModal: FC<Props> = ({
  isOpen = false,
  possessive = "your",
  isSubmitting = false,
  error = false,
  onClose = (): void => {},
  onSubmit = (): void => {},
}) => {
  const footer = (
    <>
      <Button onClick={onClose} disabled={isSubmitting}>
        Cancel
      </Button>
      <Button
        colorScheme="red"
        onClick={onSubmit}
        disabled={isSubmitting}
        ml={3}
      >
        Delete
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Delete Account"
      footer={footer}
    >
      <Box paddingX={6}>
        {error && (
          <Alert status="error" borderRadius={6}>
            <AlertIcon />
            Error deleting user. Please refresh page and try again.
          </Alert>
        )}
        <Text>{`Are you sure you want to delete ${possessive} account? You will not be able to recover any of the data once this action is complete.`}</Text>
      </Box>
    </Modal>
  );
};

export default DeleteAccountModal;
