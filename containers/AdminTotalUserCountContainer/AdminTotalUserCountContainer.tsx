import React, { FC, useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import AdminUserCount from "../../components/AdminUserCount";

import axiosClient from "../../axios";
import { getTotalUsersData } from "../../helpers/charts";
import AdminUserCountPlaceholder from "../../placeholders/AdminUserCountPlaceholder";
import { TotalUserDto } from "../../types/total-users-dto";

const AdminTotalUserCountContainer: FC = () => {
  const { data: session, status } = useSession();

  const [usersCount, setUsersCount] = useState<TotalUserDto[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      axiosClient
        .get("/users/total/week", session?.authConfig)
        .then((response) => {
          setUsersCount(response.data);
        })
        .finally(() => setIsLoading(false));
    }
  }, [status, session]);

  if (isLoading) {
    return <AdminUserCountPlaceholder />;
  }

  return <AdminUserCount data={getTotalUsersData(usersCount)} />;
};

export default AdminTotalUserCountContainer;
