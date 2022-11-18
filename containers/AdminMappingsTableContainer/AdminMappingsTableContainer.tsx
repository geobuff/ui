import React, { FC, useState } from "react";

import { useDisclosure, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import useMappingGroups from "../../hooks/UseMappingGroups";

import AdminMappings from "../../components/AdminMappings";
import { DeleteModal } from "../../components/DeleteModal/DeleteModal";

import axiosClient from "../../axios";
import { genericToast } from "../../helpers/toasts";
import {
  EditMappingGroupPayload,
  EditMappingGroupSubmit,
} from "../../types/edit-mapping-group-submit";
import { MappingGroup } from "../../types/mapping-group";
import EditMappingModalContainer from "../EditMappingModalContainer/EditMappingModalContainer";

const AdminMappingsTableContainer: FC = () => {
  const toast = useToast();

  const { data: groups, isLoading: isGroupsLoading } = useMappingGroups();
  const { data: session } = useSession();

  const [group, setGroup] = useState("world-countries");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<MappingGroup>(null);

  const {
    isOpen: isDeleteMappingModalOpen,
    onOpen: onDeleteMappingModalOpen,
    onClose: onDeleteMappingModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditMappingModalOpen,
    onOpen: onEditMappingModalOpen,
    onClose: onEditMappingModalClose,
  } = useDisclosure();

  const handleEdit = (): void => {
    setSelectedGroup(groups.find((x) => x.key === group));
    onEditMappingModalOpen();
  };

  const handleDeleteMappingSubmit = (): void => {
    setError("");
    setIsSubmitting(true);
    axiosClient
      .delete(`/mappings/${group}`, session?.authConfig)
      .then(() => {
        toast(
          genericToast(
            "Delete Mapping",
            `Successfully deleted the ${group} mapping.`
          )
        );
        onDeleteMappingModalClose();
        setGroup("world-countries");
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  const handleEditMappingSubmit = (values: EditMappingGroupSubmit): void => {
    setIsSubmitting(true);
    setError("");

    const payload: EditMappingGroupPayload = {
      label: values.label,
      entries: values.entries.map((x) => {
        return {
          ...x,
          alternativeNames: x.alternativeNames.split(","),
          prefixes: x.prefixes.split(","),
        };
      }),
    };

    axiosClient
      .put(`mappings/${group}`, payload, session?.authConfig)
      .then(() => {
        toast(
          genericToast("Edit Mapping", `Successfully updated ${group} mapping.`)
        );
        onEditMappingModalClose();
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <AdminMappings
        group={group}
        groups={groups}
        isLoading={isGroupsLoading}
        setGroup={setGroup}
        onEdit={handleEdit}
        onDelete={onDeleteMappingModalOpen}
      />
      <DeleteModal
        isOpen={isDeleteMappingModalOpen}
        header="Delete Mapping"
        message={`Are you sure you want to delete the ${group} mapping?`}
        onClose={onDeleteMappingModalClose}
        onSubmit={handleDeleteMappingSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
      <EditMappingModalContainer
        group={selectedGroup}
        isOpen={isEditMappingModalOpen}
        onClose={onEditMappingModalClose}
        onSubmit={handleEditMappingSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    </>
  );
};

export default AdminMappingsTableContainer;
