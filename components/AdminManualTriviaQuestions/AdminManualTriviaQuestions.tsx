import React, { FC } from "react";
import { Alert, AlertIcon, Flex } from "@chakra-ui/react";
import Card from "../Card";
import AdminManualTriviaQuestionsTable from "./AdminManualTriviaQuestionsTable";
import { ManualTriviaQuestion } from "../../types/manual-trivia-question";
import AdminManualTriviaQuestionsFilters from "./AdminManualTriviaQuestionsFilters";
import { TriviaQuestionType } from "../../types/trivia-question-type";
import { TriviaQuestionFilterParams } from "../../types/trivia-question-filter-param";
import { TriviaQuestionCategory } from "../../types/trivia-question-category";
import TablePaginationControls from "../Table/TablePaginationControls/TablePaginationControls";
import TableHeader from "../Table/TableHeader/TableHeader";

interface Props {
  entries?: ManualTriviaQuestion[];
  hasMoreEntries?: boolean;
  types?: TriviaQuestionType[];
  categories?: TriviaQuestionCategory[];
  isLoading?: boolean;
  error?: string;
  filterParams?: TriviaQuestionFilterParams;
  onChangeFilterParams?: React.Dispatch<
    React.SetStateAction<TriviaQuestionFilterParams>
  >;
  onCreateQuestionClick?: () => void;
  onEditQuestionClick?: (question: ManualTriviaQuestion) => void;
  onDeleteQuestionClick?: (questionId: number) => void;
}

const AdminManualTriviaQuestions: FC<Props> = ({
  entries = [],
  hasMoreEntries = false,
  types = [],
  categories = [],
  filterParams = { page: 0, limit: 10 },
  isLoading = false,
  error = "",
  onChangeFilterParams = (): void => {},
  onCreateQuestionClick = (): void => {},
  onEditQuestionClick = (): void => {},
  onDeleteQuestionClick = (): void => {},
}) => {
  const handleChangeType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const updatedFilterParams = { ...filterParams, page: 0 };
    if (event.target.value) {
      updatedFilterParams.typeId = parseInt(event.target.value);
    } else {
      delete updatedFilterParams.typeId;
    }

    onChangeFilterParams(updatedFilterParams);
  };

  const handleChangeCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const updatedFilterParams = { ...filterParams, page: 0 };
    if (event.target.value) {
      updatedFilterParams.categoryId = parseInt(event.target.value);
    } else {
      delete updatedFilterParams.categoryId;
    }

    onChangeFilterParams(updatedFilterParams);
  };

  const handleChangeSearchQuestion = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onChangeFilterParams({
      ...filterParams,
      question: event.target.value,
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
          <TableHeader
            heading="Manual Trivia Questions"
            action="Create Question"
            onClick={onCreateQuestionClick}
          />

          <AdminManualTriviaQuestionsFilters
            types={types}
            typeId={filterParams.typeId ? filterParams.typeId.toString() : ""}
            categories={categories}
            categoryId={
              filterParams.categoryId ? filterParams.categoryId.toString() : ""
            }
            isLoading={isLoading}
            onChangeType={handleChangeType}
            onChangeCategory={handleChangeCategory}
            onChangeSearchQuestion={handleChangeSearchQuestion}
          />

          <AdminManualTriviaQuestionsTable
            entries={entries}
            isLoading={isLoading}
            onEditQuestionClick={onEditQuestionClick}
            onDeleteQuestionClick={onDeleteQuestionClick}
          />

          <TablePaginationControls
            hasMoreEntries={hasMoreEntries}
            isLoading={isLoading}
            page={filterParams.page}
            onChangeLimit={handleChangeLimit}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        </Flex>
      </Card>
    </Flex>
  );
};

export default AdminManualTriviaQuestions;
