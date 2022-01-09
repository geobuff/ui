import { Flex } from "@chakra-ui/react";
import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminDashboard from "../../components/AdminDashboard";
import GameSpinner from "../../components/GameSpinner";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { AdminDashboardData } from "../../types/admin-dashboard-data";

const AdminDashboardContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);
  const [data, setData] = useState<AdminDashboardData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axiosClient
      .get("/admin", getAuthConfig())
      .then((response) => {
        setData(response.data);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [getAuthConfig]);

  if (isLoading) {
    return (
      <Flex
        flex={1}
        direction="column"
        height="100%"
        width="100%"
        maxWidth={1300}
        padding={5}
        marginLeft="auto"
        marginRight="auto"
      >
        <GameSpinner />
      </Flex>
    );
  }

  return <AdminDashboard data={data} error={error} />;
};

export default AdminDashboardContainer;
