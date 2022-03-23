import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminQuizTable from "../../components/AdminQuizTable";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { QuizPageDto } from "../../types/quiz-page-dto";
import { QuizzesFilterDto } from "../../types/quizzes-filter-dto";

const AdminQuizzesContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);

  const [quizPage, setQuizPage] = useState<QuizPageDto>();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const filter: QuizzesFilterDto = {
      filter: "",
      page: page,
      limit: 10,
      orderByPopularity: false,
    };

    axiosClient.post(`/quizzes/all`, filter).then((response) => {
      setQuizPage(response.data);
      setIsLoading(false);
    });
  }, [page]);

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
    <AdminQuizTable
      quizPage={quizPage}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      page={page}
      onPreviousPage={handlePreviousPage}
      onNextPage={handleNextPage}
    />
  );
};

export default AdminQuizzesContainer;
