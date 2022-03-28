import { useDisclosure } from "@chakra-ui/react";
import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminQuizTable from "../../components/AdminQuizTable";
import DeleteQuizModal from "../../components/DeleteQuizModal";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { QuizPageDto } from "../../types/quiz-page-dto";
import { QuizzesFilterDto } from "../../types/quizzes-filter-dto";

const AdminQuizTableContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);

  const [quizPage, setQuizPage] = useState<QuizPageDto>();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [quizId, setQuizId] = useState(0);

  const {
    isOpen: isDeleteQuizModalOpen,
    onOpen: onDeleteQuizModalOpen,
    onClose: onDeleteQuizModalClose,
  } = useDisclosure();

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

  const handleDeleteQuiz = (quizId: number): void => {
    setError(false);
    setQuizId(quizId);
    onDeleteQuizModalOpen();
  };

  const handleSubmit = (): void => {
    setIsSubmitting(true);
    setError(false);

    axiosClient
      .delete(`/quizzes/${quizId}`, getAuthConfig())
      .then(() => {
        setQuizPage({
          ...quizPage,
          quizzes: quizPage.quizzes.filter((x) => x.id !== quizId),
        });
        onDeleteQuizModalClose();
      })
      .catch(() => setError(true))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <AdminQuizTable
        quizPage={quizPage}
        isLoading={isLoading}
        page={page}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        onDeleteQuiz={handleDeleteQuiz}
      />
      <DeleteQuizModal
        isOpen={isDeleteQuizModalOpen}
        onClose={onDeleteQuizModalClose}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    </>
  );
};

export default AdminQuizTableContainer;
