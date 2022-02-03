import { useDisclosure } from "@chakra-ui/react";
import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminUsersTable from "../../components/AdminUsersTable";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { UserPageDto } from "../../types/user-page-dto";
import DeleteAccountContainer from "../DeleteAccountContainer";

const AdminUsersContainer: FC = () => {
  const { user, getAuthConfig } = useContext(CurrentUserContext);
  const [userPage, setUserPage] = useState<UserPageDto>();
  const [page, setPage] = useState(0);
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return null;
  }

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
      <DeleteAccountContainer
        isOpen={isDeleteAccountModalOpen}
        onClose={onDeleteAccountModalClose}
        possessive="this"
        userId={userId}
      />
    </>
  );
};

export default AdminUsersContainer;
