import { useDisclosure } from "@chakra-ui/react";
import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminUsersTable from "../../components/AdminUsersTable";
import DeleteAccountModal from "../../components/DeleteAccountModal";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { UserPageDto } from "../../types/user-page-dto";

const AdminUsersContainer: FC = () => {
  const { user, getAuthConfig } = useContext(CurrentUserContext);
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
    axiosClient
      .get(`/users?page=${page}`, getAuthConfig())
      .then((response) => {
        setUserPage(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [page]);

  const handleSubmit = (): void => {
    setIsSubmitting(true);
    setError(false);

    axiosClient
      .delete(`/users/${userId}`, getAuthConfig())
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
    setIsLoading(true);
    setPage(page - 1);
    setIsLoading(false);
  };

  const handleNextPage = (): void => {
    setIsLoading(true);
    setPage(page + 1);
    setIsLoading(false);
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
