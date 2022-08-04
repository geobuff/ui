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
  Link,
} from "@chakra-ui/react";

import TableCell from "../../TableCell";
import { FlagEntry } from "../../../types/flag-group";
import AdminFlagsTablePlaceholder from "../../../placeholders/AdminFlagsTablePlaceholder";

export interface Props {
  entries?: FlagEntry[];
  isLoading?: boolean;
}

const AdminFlagsTable: FC<Props> = ({ entries = [], isLoading = true }) => {
  const getTable = (): JSX.Element => {
    if (entries.length === 0) {
      return (
        <Alert status="info" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          No flags to display.
        </Alert>
      );
    }

    return (
      <Table size="md" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th textAlign="left">{"CODE"} </Th>
            <Th textAlign="left">{"URL"}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {entries.map((entry, index) => (
            <Tr key={index} fontWeight={600}>
              <TableCell paddingY={4} paddingX={6} minWidth="260px">
                {entry.code}
              </TableCell>
              <TableCell paddingY={4} paddingX={6}>
                <Link href={entry.url}>{entry.url}</Link>
              </TableCell>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  return (
    <Box overflow="scroll" margin={2}>
      {isLoading ? <AdminFlagsTablePlaceholder /> : getTable()}
    </Box>
  );
};

export default AdminFlagsTable;
