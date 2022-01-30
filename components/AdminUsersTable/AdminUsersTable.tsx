import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { UserPageDto } from "../../types/user-page-dto";
import TableCell from "../TableCell";

export interface Props {
  currentUserId?: number;
  userPage?: UserPageDto;
  isSubmitting?: boolean;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  onDeleteUser?: (userId: number) => void;
}

const AdminUsersTable: FC<Props> = ({
  currentUserId = 0,
  userPage = {},
  isSubmitting = false,
  setPage = (): void => {},
  onDeleteUser = (userId: number): void => {},
}) => {
  return (
    <Flex
      margin={6}
      background="white"
      borderRadius={12}
      justifyContent="center"
    >
      <Box overflow="auto" margin={6}>
        <Table size="md" variant="striped" colorscheme="gray">
          <Thead>
            <Tr>
              <Th textAlign="left">{"USERNAME"} </Th>
              <Th textAlign="left">{"EMAIL"}</Th>
              <Th>{""}</Th>
            </Tr>
          </Thead>

          <Tbody>
            {userPage?.users.map((user, index) => (
              <Tr key={index} fontWeight={600}>
                <TableCell paddingY={3} paddingX={6}>
                  {user.username}
                </TableCell>
                <TableCell paddingY={3} paddingX={6}>
                  {user.email}
                </TableCell>
                <TableCell isNumeric paddingY={3} paddingX={6}>
                  <Button
                    colorScheme="red"
                    onClick={() => onDeleteUser(user.id)}
                    disabled={user.id === currentUserId || isSubmitting}
                  >
                    DELETE
                  </Button>
                </TableCell>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default AdminUsersTable;
