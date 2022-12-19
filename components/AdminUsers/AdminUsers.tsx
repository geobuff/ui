import React, { FC } from "react";

import { Card } from "@geobuff/buff-ui/components";

import { Alert, AlertIcon } from "@chakra-ui/react";

import { UserDto } from "../../types/user-dto";
import { UsersFilterParams } from "../../types/users-filter-params";
import TableHeader from "../Table/TableHeader/TableHeader";
import TablePaginationControls from "../Table/TablePaginationControls/TablePaginationControls";
import AdminUsersFilters from "./AdminUsersFilters/AdminUsersFilters";
import AdminUsersTable from "./AdminUsersTable/AdminUsersTable";

export interface Props {
  currentUserId?: number;
  users?: UserDto[];
  hasMoreUsers?: boolean;
  isLoading?: boolean;
  error?: string;
  filterParams?: UsersFilterParams;
  onChangeFilterParams?: React.Dispatch<
    React.SetStateAction<UsersFilterParams>
  >;
  onDeleteUser?: (userId: number) => void;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
}

const AdminUsers: FC<Props> = ({
  currentUserId = 0,
  users = [],
  hasMoreUsers = false,
  filterParams = { page: 0, limit: 10 },
  isLoading = false,
  error = "",
  onChangeFilterParams = (): void => {},
  onDeleteUser = (userId: number): void => {},
}) => {
  const handleChangeSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onChangeFilterParams({
      ...filterParams,
      filter: event.target.value,
      page: 0,
    });
  };

  const handleChangeLimit = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const limit = parseInt(event.target.value);
    onChangeFilterParams({ ...filterParams, limit: limit, page: 0 });
  };

  const handleNextPage = (): void => {
    onChangeFilterParams({ ...filterParams, page: filterParams.page + 1 });
  };

  const handlePreviousPage = (): void => {
    onChangeFilterParams({ ...filterParams, page: filterParams.page - 1 });
  };

  if (error) {
    return (
      <Alert status="error" borderRadius={6} marginTop={6}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Card marginY={10} padding={6}>
      <TableHeader heading="Users" />

      <AdminUsersFilters
        isLoading={isLoading}
        onChangeSearch={handleChangeSearch}
      />

      <AdminUsersTable
        currentUserId={currentUserId}
        users={users}
        onDeleteUser={onDeleteUser}
        isLoading={isLoading}
      />

      <TablePaginationControls
        hasMoreEntries={hasMoreUsers}
        isLoading={isLoading}
        page={filterParams.page}
        onChangeLimit={handleChangeLimit}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
    </Card>
  );
};

export default AdminUsers;
