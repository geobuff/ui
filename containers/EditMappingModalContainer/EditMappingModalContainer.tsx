import React, { FC } from "react";

import useMappingEntries from "../../hooks/UseMappingEntries";

import { EditMappingModal } from "../../components/EditMappingModal/EditMappingModal";

import { EditMappingGroupSubmit } from "../../types/edit-mapping-group-submit";
import { MappingEntry } from "../../types/mapping-entry";
import { MappingGroup } from "../../types/mapping-group";

const getMapping = (
  label: string,
  entries: MappingEntry[]
): EditMappingGroupSubmit => {
  return {
    label: label,
    entries: entries.map((x) => {
      return {
        ...x,
        alternativeNames: x.alternativeNames.toString(),
        prefixes: x.prefixes.toString(),
      };
    }),
  };
};

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
    return null;
  }

  return (
    <EditMappingModal
      mapping={getMapping(group.label, entries)}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
};

export default EditMappingModalContainer;
