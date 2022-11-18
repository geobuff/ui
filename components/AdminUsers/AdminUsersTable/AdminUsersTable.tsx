import React, { FC } from "react";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Link,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DateTime } from "luxon";

import AdminUsersTablePlaceholder from "../../../placeholders/AdminUsersTablePlaceholder";
import { UserDto } from "../../../types/user-dto";
import CustomFlag from "../../CustomFlag";
import TableCell from "../../Table/TableCell";

export interface Props {
  currentUserId?: number;
  users?: UserDto[];
  isLoading?: boolean;
  onDeleteUser?: (userId: number) => void;
}

const AdminUsersTable: FC<Props> = ({
  currentUserId = 0,
  users = [],
  isLoading = false,
  onDeleteUser = (): void => {},
}) => {
  const getTable = (): JSX.Element => {
    if (users.length === 0) {
      return (
        <Alert status="info" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          No users to display.
        </Alert>
      );
    }

    return (
      <Table size="md" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th textAlign="left">{"USERNAME"} </Th>
            <Th textAlign="left">{"EMAIL"}</Th>
            <Th textAlign="left">{"COUNTRY"}</Th>
            <Th textAlign="left">{"AVATAR"}</Th>
            <Th textAlign="left">{"JOINED"}</Th>
            <Th>{""}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {users?.map((user, index) => (
            <Tr key={index} fontWeight={600}>
              <TableCell paddingY={3} paddingX={6}>
                <Link href={`/profile/${user.id}`}>{user.username}</Link>
              </TableCell>
              <TableCell paddingY={3} paddingX={6}>
                {user.email}
              </TableCell>
              <TableCell paddingY={3} paddingX={6}>
                <Box marginRight={4}>
                  <CustomFlag url={user.flagUrl} code={user.countryCode} />
                </Box>
              </TableCell>
              <TableCell paddingY={3} paddingX={6}>
                {user.avatarName}
              </TableCell>
              <TableCell paddingY={3} paddingX={6}>
                {DateTime.fromISO(user.joined).toLocaleString(
                  DateTime.DATE_MED
                )}
              </TableCell>
              <TableCell paddingY={3} paddingX={6}>
                <Button
                  colorScheme="red"
                  onClick={() => onDeleteUser(user.id)}
                  disabled={user.id === currentUserId}
                >
                  DELETE
                </Button>
              </TableCell>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  return (
    <Box overflow="scroll" margin={2}>
      {isLoading ? <AdminUsersTablePlaceholder /> : getTable()}
    </Box>
  );
};

export default AdminUsersTable;
