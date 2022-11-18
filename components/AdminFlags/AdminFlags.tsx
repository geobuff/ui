import React, { FC } from "react";

import { Divider, Flex } from "@chakra-ui/react";

import useFlagGroup from "../../hooks/UseFlagEntries";

import { FlagGroup } from "../../types/flag-group";
import Card from "../Card";
import AdminFlagsFilters from "./AdminFlagsFilters";
import AdminFlagsHeader from "./AdminFlagsHeader";
import AdminFlagsTable from "./AdminFlagsTable";

interface Props {
  group?: string;
  groups?: FlagGroup[];
  setGroup?: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  onCreateFlagsClick?: () => void;
}

const AdminFlags: FC<Props> = ({
  group = "",
  groups = [],
  setGroup = (): void => {},
  isLoading = false,
  onCreateFlagsClick = (): void => {},
}) => {
  const { data: entries, isLoading: isEntriesLoading } = useFlagGroup(group);

  return (
    <Flex
      direction="column"
      maxWidth={{ base: "100%", md: 1300 }}
      marginX="auto"
      marginBottom={14}
      marginTop={6}
      paddingX={3}
      width="100%"
    >
      <Card>
        <Flex
          direction="column"
          justifyContent="space-between"
          paddingTop={2}
          paddingBottom={{ base: 1, md: 3 }}
        >
          <AdminFlagsHeader onCreateFlagsClick={onCreateFlagsClick} />

          <Divider borderWidth={1} marginBottom={6} />

          <AdminFlagsFilters
            groups={groups}
            group={group}
            isLoading={isLoading || isEntriesLoading}
            setGroup={setGroup}
          />

          <AdminFlagsTable
            entries={entries}
            isLoading={isLoading || isEntriesLoading}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default AdminFlags;
