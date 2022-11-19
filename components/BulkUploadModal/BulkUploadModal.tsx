import React, { FC } from "react";

import { Flex } from "@chakra-ui/react";

import { BulkUploadValues } from "../../types/bulk-upload-values";
import BulkUploadForm from "../BulkUploadForm";
import Modal from "../Modal";

export interface Props {
  isOpen?: boolean;
  isSubmitting?: boolean;
  error?: string;
  setError?: (value: string) => void;
  onClose?: () => void;
  onSubmit?: (values: BulkUploadValues) => void;
}

const BulkUploadModal: FC<Props> = ({
  isOpen = false,
  isSubmitting = false,
  error = "",
  setError = () => {},
  onClose = (): void => {},
  onSubmit = (): void => {},
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    maxHeight={{ base: "100%", md: "700px" }}
    minWidth="660px"
  >
    <Flex padding={10} width="100%" overflow="scroll">
      <BulkUploadForm
        isSubmitting={isSubmitting}
        error={error}
        setError={setError}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </Flex>
  </Modal>
);

export default BulkUploadModal;
