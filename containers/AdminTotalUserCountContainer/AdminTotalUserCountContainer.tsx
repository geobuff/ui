import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminUserCount from "../../components/AdminUserCount";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const AdminTotalUserCountContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/users-total", getAuthConfig())
      .then((response) => {
        setCount(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [getAuthConfig]);

  if (isLoading) {
    return null;
  }

  return <AdminUserCount count={count} />;
};

export default AdminTotalUserCountContainer;
