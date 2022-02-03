import React, { FC } from "react";
import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { UserPageDto } from "../../types/user-page-dto";
import CustomFlag from "../CustomFlag";
import TableCell from "../TableCell";
import { getFlagUrl } from "@geobuff/flags";
import ArrowRight from "../../Icons/ArrowRight";
import ArrowLeft from "../../Icons/ArrowLeft";

export interface Props {
  currentUserId?: number;
  userPage?: UserPageDto;
  page?: number;
  isLoading?: boolean;
  onDeleteUser?: (userId: number) => void;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
}

const AdminUsersTable: FC<Props> = ({
  currentUserId = 0,
  userPage = {},
  page = 0,
  isLoading = false,
  onDeleteUser = (userId: number): void => {},
  onNextPage = (): void => {},
  onPreviousPage = (): void => {},
}) => {
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });

  return (
    <Flex
      margin={6}
      padding={12}
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
              <Th textAlign="left">{"COUNTRY"}</Th>
              <Th textAlign="left">{"AVATAR"}</Th>
              <Th textAlign="left">{"JOINED"}</Th>
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
                <TableCell paddingY={3} paddingX={6}>
                  <Box marginRight={4}>
                    <CustomFlag url={getFlagUrl(user.countryCode)} />
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
                <TableCell isNumeric paddingY={3} paddingX={6}>
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
        <Flex marginTop="auto" py={4}>
          <Box marginLeft="auto">
            <Button
              backgroundColor="#F3F3F3"
              isDisabled={page === 0 || isLoading}
              marginRight={{ base: 2, sm: 3 }}
              onClick={onPreviousPage}
              height="48px"
              width={{ base: "46px", md: "132px" }}
              _hover={{ backgroundColor: "#e6e6e6" }}
            >
              <ArrowLeft
                marginRight={{ base: 0, md: "6px" }}
                height="20px"
                width="20px"
              />
              {shouldRenderOnMobile && "Previous"}
            </Button>

            <Button
              role="group"
              backgroundColor="#F3F3F3"
              onClick={onNextPage}
              isDisabled={!userPage.hasMore || isLoading}
              height="48px"
              width={{ base: "46px", md: "132px" }}
              _hover={{ backgroundColor: "#e6e6e6" }}
            >
              {shouldRenderOnMobile && "Next"}
              <ArrowRight
                marginLeft={{ base: 0, md: "6px" }}
                height="20px"
                width="20px"
              />
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AdminUsersTable;