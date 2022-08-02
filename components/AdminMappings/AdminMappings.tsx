import React, { FC } from "react";
import { Divider, Flex } from "@chakra-ui/react";
import Card from "../Card";
import { FlagGroup } from "../../types/flag-group";
import AdminFlagsTable from "./AdminMappingsTable";
import AdminFlagsFilters from "./AdminMappingsFilters";
import useMappingEntries from "../../hooks/UseMappingEntries";
import AdminMappingsHeader from "./AdminMappingsHeader";

interface Props {
  group?: string;
  groups?: FlagGroup[];
  setGroup?: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
}

const AdminMappings: FC<Props> = ({
  group = "",
  groups = [],
  setGroup = (): void => {},
  isLoading = false,
}) => {
  const { data: entries, isLoading: isEntriesLoading } =
    useMappingEntries(group);

  return (
    <Flex
      direction="column"
      maxWidth={{ base: "100%", md: 1300 }}
      marginX="auto"
      marginBottom={14}
      marginTop={{ base: 10, sm: 10, md: 14 }}
      paddingX={3}
      width="100%"
    >
      <Card>
        <Flex
          direction="column"
          justifyContent="space-between"
          minHeight="750px"
          paddingTop={2}
          paddingBottom={{ base: 1, md: 3 }}
        >
          <AdminMappingsHeader />

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

export default AdminMappings;
