import React, { FC, useEffect, useState } from "react";

import { DeleteModal } from "@geobuff/buff-ui/components";

import { useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import AdminUsersTable from "../../components/AdminUsers";

import axiosClient from "../../axios";
import { AuthUser } from "../../types/auth-user";
import { UserPageDto } from "../../types/user-page-dto";
import { UsersFilterParams } from "../../types/users-filter-params";

const AdminUsersContainer: FC = () => {
  const { data: session, status } = useSession();
  const user = session?.user as AuthUser;

  const [userPage, setUserPage] = useState<UserPageDto>();
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [filterParams, setFilterParams] = useState<UsersFilterParams>({
    page: 0,
    limit: 10,
  });

  const {
    isOpen: isDeleteAccountModalOpen,
    onOpen: onDeleteAccountModalOpen,
    onClose: onDeleteAccountModalClose,
  } = useDisclosure();

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(true);
      axiosClient
        .post(`/users/all`, filterParams, session?.authConfig)
        .then((response) => {
          setUserPage(response.data);
        })
        .finally(() => setIsLoading(false));
    }
  }, [status, session, filterParams]);

  const handleSubmit = (): void => {
    setIsSubmitting(true);
    setError("");

    axiosClient
      .delete(`/users/${userId}`, session?.authConfig)
      .then(() => {
        setUserPage({
          ...userPage,
          users: userPage.users.filter((x) => x.id !== userId),
        });
        onDeleteAccountModalClose();
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  const handleDeleteUser = (userId: number) => {
    setUserId(userId);
    onDeleteAccountModalOpen();
  };

  return (
    <>
      <AdminUsersTable
        currentUserId={user?.id}
        users={userPage?.users}
        hasMoreUsers={userPage?.hasMore}
        error={error}
        filterParams={filterParams}
        onChangeFilterParams={setFilterParams}
        isLoading={isLoading}
        onDeleteUser={handleDeleteUser}
      />
      <DeleteModal
        header="Delete Account"
        message="Are you sure you want to delete this account? You will not be able to recover any of the data once this action is complete."
        isOpen={isDeleteAccountModalOpen}
        onClose={onDeleteAccountModalClose}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    </>
  );
};

export default AdminUsersContainer;
