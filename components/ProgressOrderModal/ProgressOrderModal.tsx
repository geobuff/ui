import { Alert, AlertIcon, Box, Button, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import Modal from "../Modal";

export interface Props {
  isOpen?: boolean;
  previous?: string;
  next?: string;
  isSubmitting?: boolean;
  error?: string;
  onClose?: () => void;
  onSubmit?: () => void;
}

const ProgressOrderModal: FC<Props> = ({
  isOpen = false,
  previous = "",
  next = "",
  isSubmitting = false,
  error = "",
  onClose = (): void => {},
  onSubmit = (): void => {},
}) => {
  const footer = (
    <>
      <Button onClick={onClose} disabled={isSubmitting}>
        Cancel
      </Button>
      <Button
        colorScheme="green"
        onClick={onSubmit}
        disabled={isSubmitting}
        ml={3}
      >
        Submit
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Progress Order"
      footer={footer}
    >
      <Box paddingX={6}>
        {error && (
          <Alert status="error" borderRadius={6} marginBottom={3}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Text>{`Are you sure you want to progress this order from ${previous} to ${next}?`}</Text>
      </Box>
    </Modal>
  );
};

export default ProgressOrderModal;
