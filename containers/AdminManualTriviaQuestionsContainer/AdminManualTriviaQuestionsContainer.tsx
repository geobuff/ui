import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminManualTriviaQuestionsTable from "../../components/AdminManualTriviaQuestionsTable";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ManualQuestionsDto } from "../../types/manual-questions-dto";

const AdminManualTriviaQuestionsContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);
  const [questionPage, setQuestionPage] = useState<ManualQuestionsDto>();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    axiosClient
      .get(`/manual-trivia-questions?page=${page}`, getAuthConfig())
      .then((response) => {
        setQuestionPage(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [getAuthConfig, page]);

  const handlePreviousPage = (): void => {
    setIsLoading(true);
    setPage(page - 1);
    setIsLoading(false);
  };

  const handleNextPage = (): void => {
    setIsLoading(true);
    setPage(page + 1);
    setIsLoading(false);
  };

  return (
    <AdminManualTriviaQuestionsTable
      questionPage={questionPage}
      isLoading={isLoading}
      page={page}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
    />
  );
};

export default AdminManualTriviaQuestionsContainer;
