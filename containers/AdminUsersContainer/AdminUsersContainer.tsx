import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminUsersTable from "../../components/AdminUsersTable";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { UserPageDto } from "../../types/user-page-dto";

const AdminUsersContainer: FC = () => {
  const { user, getAuthConfig } = useContext(CurrentUserContext);
  const [userPage, setUserPage] = useState<UserPageDto>();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axiosClient
      .get(`/users?page=${page}`, getAuthConfig())
      .then((response) => {
        setUserPage(response.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleDeleteUser = (userId: number): void => {
    setIsSubmitting(true);
    axiosClient
      .delete(`/users/${userId}`, getAuthConfig())
      .then(() => {
        setUserPage({
          users: userPage.users.filter((x) => x.id !== userId),
          hasMore: userPage.hasMore,
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  if (isLoading) {
    return null;
  }

  return (
    <AdminUsersTable
      currentUserId={user?.id}
      userPage={userPage}
      isSubmitting={isSubmitting}
      setPage={setPage}
      onDeleteUser={handleDeleteUser}
    />
  );
};

export default AdminUsersContainer;
