import React, { FC, useState } from "react";
import useFlagGroups from "../../hooks/UseFlagGroups";
import AdminFlags from "../../components/AdminFlags";

const AdminFlagsTableContainer: FC = () => {
  const { data: groups, isLoading: isGroupsLoading } = useFlagGroups();
  const [group, setGroup] = useState("world");

  return (
    <AdminFlags
      group={group}
      groups={groups}
      isLoading={isGroupsLoading}
      setGroup={setGroup}
    />
  );
};

export default AdminFlagsTableContainer;
