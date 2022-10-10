import React, { FC } from "react";
import TableHeader from "../Table/TableHeader/TableHeader";
import { AdminQuizTable } from "./AdminQuizTable/AdminQuizTable";
import TablePaginationControls from "../Table/TablePaginationControls/TablePaginationControls";
import { UsersFilterParams } from "../../types/users-filter-params";
import { QuizPageDto } from "../../types/quiz-page-dto";
import { Quiz } from "../../types/quiz";
import Card from "../Card";
import { AdminQuizFilters } from "./AdminQuizFilters/AdminQuizFilters";

export interface Props {
  quizPage?: QuizPageDto;
  isLoading?: boolean;
  filterParams?: UsersFilterParams;
  onChangeFilterParams?: React.Dispatch<
    React.SetStateAction<UsersFilterParams>
  >;
  onCreate?: () => void;
  onEdit?: (quiz: Quiz) => void;
  onDelete?: (quizId: number) => void;
}

const AdminQuizzes: FC<Props> = ({
  quizPage = null,
  isLoading = false,
  filterParams = null,
  onChangeFilterParams = () => {},
  onCreate = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
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

  const handleChangeSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onChangeFilterParams({
      ...filterParams,
      filter: event.target.value,
      page: 0,
    });
  };

  return (
    <Card marginY={10} padding={6}>
      <TableHeader
        heading="Quizzes"
        actions={[{ name: "Create Quiz", callback: onCreate }]}
      />

      <AdminQuizFilters
        isLoading={isLoading}
        onChangeSearch={handleChangeSearch}
      />

      <AdminQuizTable
        quizzes={quizPage?.quizzes}
        isLoading={isLoading}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <TablePaginationControls
        page={filterParams.page}
        isLoading={isLoading}
        onChangeLimit={handleChangeLimit}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        hasMoreEntries={quizPage?.hasMore}
      />
    </Card>
  );
};

export default AdminQuizzes;
