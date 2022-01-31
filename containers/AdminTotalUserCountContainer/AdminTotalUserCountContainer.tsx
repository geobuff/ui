import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminUserCount from "../../components/AdminUserCount";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { getTotalUsersData } from "../../helpers/charts";
import { TotalUserDto } from "../../types/total-users-dto";

const AdminTotalUserCountContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);
  const [usersCount, setUsersCount] = useState<TotalUserDto[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/users/total/week", getAuthConfig())
      .then((response) => {
        setUsersCount(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [getAuthConfig]);

  if (isLoading) {
    return null;
  }

  return <AdminUserCount data={getTotalUsersData(usersCount)} />;
};

export default AdminTotalUserCountContainer;
