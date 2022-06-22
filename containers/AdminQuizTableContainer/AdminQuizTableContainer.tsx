import { useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminQuizTable from "../../components/AdminQuizTable";
import DeleteQuizModal from "../../components/DeleteQuizModal";
import { QuizPageDto } from "../../types/quiz-page-dto";
import { QuizzesFilterDto } from "../../types/quizzes-filter-dto";

const AdminQuizTableContainer: FC = () => {
  const { data: session } = useSession();

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
    setPage(page - 1);
  };

  const handleNextPage = (): void => {
    setPage(page + 1);
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
      .delete(`/quizzes/${quizId}`, session?.authConfig)
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
