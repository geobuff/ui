import React, { FC, useContext } from "react";

import {
  Alert,
  AlertIcon,
  Box,
  Link,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";

import AdminFlagsTablePlaceholder from "../../../placeholders/AdminFlagsTablePlaceholder";
import { FlagEntry } from "../../../types/flag-group";
import TableCell from "../../Table/TableCell";

export interface Props {
  entries?: FlagEntry[];
  isLoading?: boolean;
}

const AdminFlagsTable: FC<Props> = ({ entries = [], isLoading = true }) => {
  const { t } = useContext(LanguageContext);

  const getTable = (): JSX.Element => {
    if (entries.length === 0) {
      return (
        <Alert status="info" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          {t.adminFlagsTable.noFlagsAlert}
        </Alert>
      );
    }

    return (
      <Table size="md" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th textAlign="left">{t.adminFlagsTable.code} </Th>
            <Th textAlign="left">{t.adminFlagsTable.url}</Th>
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
