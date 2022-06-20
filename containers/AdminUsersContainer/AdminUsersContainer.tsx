import { useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminUsersTable from "../../components/AdminUsersTable";
import DeleteAccountModal from "../../components/DeleteAccountModal";
import { AuthUser } from "../../types/auth-user";
import { UserPageDto } from "../../types/user-page-dto";

const AdminUsersContainer: FC = () => {
  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const [userPage, setUserPage] = useState<UserPageDto>();
  const [page, setPage] = useState(0);
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const {
    isOpen: isDeleteAccountModalOpen,
    onOpen: onDeleteAccountModalOpen,
    onClose: onDeleteAccountModalClose,
  } = useDisclosure();

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .get(`/users?page=${page}`, user?.authConfig)
      .then((response) => {
        setUserPage(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [user, page]);

  const handleSubmit = (): void => {
    setIsSubmitting(true);
    setError(false);

    axiosClient
      .delete(`/users/${userId}`, user?.authConfig)
      .then(() => {
        setUserPage({
          ...userPage,
          users: userPage.users.filter((x) => x.id !== userId),
        });
        onDeleteAccountModalClose();
      })
      .catch(() => setError(true))
      .finally(() => setIsSubmitting(false));
  };

  const handleDeleteUser = (userId: number) => {
    setUserId(userId);
    onDeleteAccountModalOpen();
  };

  const handlePreviousPage = (): void => {
    setPage(page - 1);
  };

  const handleNextPage = (): void => {
    setPage(page + 1);
  };

  return (
    <>
      <AdminUsersTable
        currentUserId={user?.id}
        userPage={userPage}
        page={page}
        isLoading={isLoading}
        onDeleteUser={handleDeleteUser}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
      <DeleteAccountModal
        isOpen={isDeleteAccountModalOpen}
        possessive={"this"}
        onClose={onDeleteAccountModalClose}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    </>
  );
};

export default AdminUsersContainer;
