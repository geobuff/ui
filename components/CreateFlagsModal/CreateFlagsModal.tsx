import React, { FC } from "react";

import { Alert, AlertIcon, Box } from "@chakra-ui/react";

import CreateFlagsFormContainer from "../../containers/CreateFlagsFormContainer";

import { FlagsFormSubmit } from "../../types/flags-form-submit";
import Modal from "../Modal";

export interface Props {
  isOpen?: boolean;
  isSubmitting?: boolean;
  error?: string;
  onClose?: () => void;
  onSubmit?: (values: FlagsFormSubmit) => void;
}

const CreateFlagsModal: FC<Props> = ({
  isOpen = false,
  isSubmitting = false,
  error = "",
  onClose = (): void => {},
  onSubmit = (): void => {},
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Create Flags"
      minWidth={600}
    >
      <Box paddingX={6} paddingBottom={6}>
        {error && (
          <Alert status="error" borderRadius={6} marginBottom={3}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <CreateFlagsFormContainer
          onSubmit={onSubmit}
          onClose={onClose}
          isSubmitting={isSubmitting}
        />
      </Box>
    </Modal>
  );
};

export default CreateFlagsModal;
