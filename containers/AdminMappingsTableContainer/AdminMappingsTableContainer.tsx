import React, { FC, useState } from "react";
import AdminMappings from "../../components/AdminMappings";
import useMappingGroups from "../../hooks/UseMappingGroups";

const AdminMappingsTableContainer: FC = () => {
  const { data: groups, isLoading: isGroupsLoading } = useMappingGroups();
  const [group, setGroup] = useState("world-countries");

  return (
    <AdminMappings
      group={group}
      groups={groups}
      isLoading={isGroupsLoading}
      setGroup={setGroup}
    />
  );
};

export default AdminMappingsTableContainer;
