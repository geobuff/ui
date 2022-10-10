import { useDisclosure, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { FC, useState } from "react";
import axiosClient from "../../axios";
import AdminMappings from "../../components/AdminMappings";
import { DeleteModal } from "../../components/DeleteModal/DeleteModal";
import { genericSuccessToast } from "../../helpers/toasts";
import useMappingGroups from "../../hooks/UseMappingGroups";

const AdminMappingsTableContainer: FC = () => {
  const toast = useToast();

  const { data: groups, isLoading: isGroupsLoading } = useMappingGroups();
  const { data: session } = useSession();

  const [group, setGroup] = useState("world-countries");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    isOpen: isDeleteMappingModalOpen,
    onOpen: onDeleteMappingModalOpen,
    onClose: onDeleteMappingModalClose,
  } = useDisclosure();

  const handleDeleteMappingSubmit = (): void => {
    setError("");
    setIsSubmitting(true);
    axiosClient
      .delete(`/mappings/${group}`, session?.authConfig)
      .then(() => {
        toast(
          genericSuccessToast(
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

  return (
    <>
      <AdminMappings
        group={group}
        groups={groups}
        isLoading={isGroupsLoading}
        setGroup={setGroup}
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
    </>
  );
};

export default AdminMappingsTableContainer;
