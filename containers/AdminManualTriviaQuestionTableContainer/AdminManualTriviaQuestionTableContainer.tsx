import { useDisclosure } from "@chakra-ui/react";
import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminManualTriviaQuestionsTable from "../../components/AdminManualTriviaQuestionsTable";
import DeleteTriviaQuestionModal from "../../components/DeleteTriviaQuestionModal";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ManualQuestionsDto } from "../../types/manual-questions-dto";

const AdminManualTriviaQuestionTableContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);

  const [questionPage, setQuestionPage] = useState<ManualQuestionsDto>();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [questionId, setQuestionId] = useState(0);

  const {
    isOpen: isDeleteQuestionModalOpen,
    onOpen: onDeleteQuestionModalOpen,
    onClose: onDeleteQuestionModalClose,
  } = useDisclosure();

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .get(`/manual-trivia-questions?page=${page}`, getAuthConfig())
      .then((response) => {
        setQuestionPage(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [getAuthConfig, page]);

  const handlePreviousPage = (): void => {
    setPage(page - 1);
  };

  const handleNextPage = (): void => {
    setPage(page + 1);
  };

  const handleDeleteQuestion = (questionId: number): void => {
    setQuestionId(questionId);
    onDeleteQuestionModalOpen();
  };

  const handleSubmit = (): void => {
    setIsSubmitting(true);
    setError(false);

    axiosClient
      .delete(`/manual-trivia-questions/${questionId}`, getAuthConfig())
      .then(() => {
        setQuestionPage({
          ...questionPage,
          questions: questionPage.questions.filter((x) => x.id !== questionId),
        });
        onDeleteQuestionModalClose();
      })
      .catch(() => setError(true))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <AdminManualTriviaQuestionsTable
        questionPage={questionPage}
        isLoading={isLoading}
        page={page}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        onDeleteQuestion={handleDeleteQuestion}
      />
      <DeleteTriviaQuestionModal
        isOpen={isDeleteQuestionModalOpen}
        onClose={onDeleteQuestionModalClose}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    </>
  );
};

export default AdminManualTriviaQuestionTableContainer;
