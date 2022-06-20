import { useSession } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminUserCount from "../../components/AdminUserCount";
import { getTotalUsersData } from "../../helpers/charts";
import AdminUserCountPlaceholder from "../../placeholders/AdminUserCountPlaceholder";
import { AuthUser } from "../../types/auth-user";
import { TotalUserDto } from "../../types/total-users-dto";

const AdminTotalUserCountContainer: FC = () => {
  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const [usersCount, setUsersCount] = useState<TotalUserDto[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/users/total/week", user?.authConfig)
      .then((response) => {
        setUsersCount(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [user]);

  if (isLoading) {
    return <AdminUserCountPlaceholder />;
  }

  return <AdminUserCount data={getTotalUsersData(usersCount)} />;
};

export default AdminTotalUserCountContainer;
