import React, { FC } from "react";
import { EditMappingGroupSubmit } from "../../types/edit-mapping-group-submit";
import useMappingEntries from "../../hooks/UseMappingEntries";
import { EditMappingModal } from "../../components/EditMappingModal/EditMappingModal";
import { MappingGroup } from "../../types/mapping-group";
import { Spinner } from "@chakra-ui/react";

export interface Props {
  group?: MappingGroup;
  isOpen?: boolean;
  isSubmitting?: boolean;
  error?: string;
  onClose?: () => void;
  onSubmit?: (values: EditMappingGroupSubmit) => void;
}

const EditMappingModalContainer: FC<Props> = ({
  group = null,
  isOpen = false,
  isSubmitting = false,
  error = "",
  onClose = (): void => {},
  onSubmit = (): void => {},
}) => {
  const { data: entries, isLoading } = useMappingEntries(group?.key);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <EditMappingModal
      mapping={{
        label: group.label,
        entries: entries,
      }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
};

export default EditMappingModalContainer;
