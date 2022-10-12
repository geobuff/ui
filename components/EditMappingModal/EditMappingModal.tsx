import { Alert, AlertIcon, Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { EditMappingGroupSubmit } from "../../types/edit-mapping-group-submit";
import { EditMappingForm } from "../EditMappingForm/EditMappingForm";
import Modal from "../Modal";

export interface Props {
  mapping: EditMappingGroupSubmit;
  isOpen?: boolean;
  isSubmitting?: boolean;
  error?: string;
  onClose?: () => void;
  onSubmit?: (values: EditMappingGroupSubmit) => void;
}

export const EditMappingModal: FC<Props> = ({
  mapping = null,
  isOpen = false,
  isSubmitting = false,
  error = "",
  onClose = (): void => {},
  onSubmit = (): void => {},
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    maxHeight={{ base: "100%", md: "700px" }}
    minWidth={1200}
  >
    <Flex padding={10} width="100%" overflow="scroll">
      {error && (
        <Alert status="error" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <EditMappingForm
        values={mapping}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </Flex>
  </Modal>
);
