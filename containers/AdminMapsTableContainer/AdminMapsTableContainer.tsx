import React, { FC } from "react";
import AdminMapsTable from "../../components/AdminMapsTable";
import useMaps from "../../hooks/UseMaps";

const AdminMapsTableContainer: FC = () => {
  const { data: maps, isLoading } = useMaps();

  return <AdminMapsTable maps={maps} isLoading={isLoading} />;
};

export default AdminMapsTableContainer;
