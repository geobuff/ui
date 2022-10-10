import { Alert, AlertIcon, Box, Button, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import Modal from "../Modal";

export interface Props {
  isOpen?: boolean;
  isSubmitting?: boolean;
  error?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
}

const DeleteQuizModal: FC<Props> = ({
  isOpen = false,
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
      header="Delete Quiz"
      footer={footer}
    >
      <Box paddingX={6}>
        {error && (
          <Alert status="error" borderRadius={6} marginBottom={3}>
            <AlertIcon />
            Error deleting quiz. Please refresh page and try again.
          </Alert>
        )}
        <Text>{`Are you sure you want to delete this quiz? All corresponding quiz plays, leaderboard entries and svg maps will be deleted with it.`}</Text>
      </Box>
    </Modal>
  );
};

export default DeleteQuizModal;
