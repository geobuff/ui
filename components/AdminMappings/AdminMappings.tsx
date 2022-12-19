import React, { FC, useContext } from "react";

import { Card } from "@geobuff/buff-ui/components";

import { Flex } from "@chakra-ui/react";

import { LanguageContext } from "../../contexts/LanguageContext";

import { useMappingEntries } from "../../hooks/UseMappingEntries";

import { FlagGroup } from "../../types/flag-group";
import TableHeader from "../Table/TableHeader/TableHeader";
import AdminMappingsFilters from "./AdminMappingsFilters";
import AdminMappingsTable from "./AdminMappingsTable";

interface Props {
  group?: string;
  groups?: FlagGroup[];
  setGroup?: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const AdminMappings: FC<Props> = ({
  group = "",
  groups = [],
  setGroup = (): void => {},
  isLoading = false,
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const { t } = useContext(LanguageContext);

  const { data: entries, isLoading: isEntriesLoading } =
    useMappingEntries(group);

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
          <TableHeader
            heading={t.global.mappings}
            actions={[
              { name: t.adminMappings.editMapping, callback: onEdit },
              { name: t.adminMappings.deleteMapping, callback: onDelete },
            ]}
          />

          <AdminMappingsFilters
            groups={groups}
            group={group}
            isLoading={isLoading || isEntriesLoading}
            setGroup={setGroup}
          />

          <AdminMappingsTable
            entries={entries}
            isLoading={isLoading || isEntriesLoading}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default AdminMappings;
