import React, { FC, useState } from "react";

import { useDisclosure, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import useFlagGroups from "../../hooks/UseFlagGroups";

import AdminFlags from "../../components/AdminFlags";
import CreateFlagsModal from "../../components/CreateFlagsModal";

import axiosClient from "../../axios";
import { genericToast } from "../../helpers/toasts";
import { FlagsFormSubmit } from "../../types/flags-form-submit";

const AdminFlagsTableContainer: FC = () => {
  const toast = useToast();

  const { data: session } = useSession();
  const { data: groups, isLoading: isGroupsLoading } = useFlagGroups();
  const [group, setGroup] = useState("world-countries");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();

  const handleCreateFlagsSubmit = (values: FlagsFormSubmit): void => {
    setIsSubmitting(true);
    axiosClient
      .post("/flags", values, session?.authConfig)
      .then(() => {
        toast(genericToast("Create Flags", "Successfully created new flags."));
        onClose();
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <AdminFlags
        group={group}
        groups={groups}
        isLoading={isGroupsLoading}
        setGroup={setGroup}
        onCreateFlagsClick={onOpen}
      />
      <CreateFlagsModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleCreateFlagsSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    </>
  );
};

export default AdminFlagsTableContainer;
