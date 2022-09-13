import React, { FC } from "react";
import {
  Box,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import TableCell from "../../Table/TableCell";
import { MappingEntry } from "../../../types/mapping-entry";
import AdminMappingsTablePlaceholder from "../../../placeholders/AdminMappingsTablePlaceholder";

export interface Props {
  entries?: MappingEntry[];
  isLoading?: boolean;
}

const AdminMappingsTable: FC<Props> = ({ entries = [], isLoading = true }) => {
  const getTable = (): JSX.Element => {
    if (entries.length === 0) {
      return (
        <Alert status="info" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          No mappings to display.
        </Alert>
      );
    }

    return (
      <Table size="md" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th textAlign="left">{"NAME"} </Th>
            <Th textAlign="left">{"CODE"}</Th>
            <Th textAlign="left">{"SVG NAME"}</Th>
            <Th textAlign="left">{"ALTERNATIVES"}</Th>
            <Th textAlign="left">{"PREFIXES"}</Th>
            <Th textAlign="left">{"GROUPING"}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {entries.map((entry) => (
            <Tr key={entry.id} fontWeight={600}>
              <TableCell paddingY={4} paddingX={6} minWidth="260px">
                {entry.name}
              </TableCell>
              <TableCell paddingY={4} paddingX={6}>
                {entry.code}
              </TableCell>
              <TableCell paddingY={4} paddingX={6}>
                {entry.svgName}
              </TableCell>
              <TableCell paddingY={4} paddingX={6}>
                {entry.alternativeNames.join(", ")}
              </TableCell>
              <TableCell paddingY={4} paddingX={6}>
                {entry.prefixes.join(", ")}
              </TableCell>
              <TableCell paddingY={4} paddingX={6}>
                {entry.grouping}
              </TableCell>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  return (
    <Box overflow="scroll" margin={2}>
      {isLoading ? <AdminMappingsTablePlaceholder /> : getTable()}
    </Box>
  );
};

export default AdminMappingsTable;
