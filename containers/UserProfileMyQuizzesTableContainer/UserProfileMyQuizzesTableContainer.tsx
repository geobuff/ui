import { useDisclosure, useToast } from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";
import axiosClient from "../../axios";
import DeleteCommunityQuizModal from "../../components/DeleteCommunityQuizModal";
import UserProfileMyQuizzesTable from "../../components/UserProfileMyQuizzes/UserProfileMyQuizzesTable";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { deleteCommunityQuizToast } from "../../helpers/toasts";
import { CommunityQuiz } from "../../types/community-quiz-dto";

export interface Props {
  quizzes?: CommunityQuiz[];
  isCurrentUser?: boolean;
}

const UserProfileMyQuizzesTableContainer: FC<Props> = ({
  quizzes = [],
  isCurrentUser = false,
}) => {
  const toast = useToast();
  const { getAuthConfig } = useContext(CurrentUserContext);

  const [myQuizzes, setMyQuizzes] = useState(quizzes);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [quizId, setQuizId] = useState(0);

  const {
    isOpen: isDeleteQuizModalOpen,
    onOpen: onDeleteQuizModalOpen,
    onClose: onDeleteQuizModalClose,
  } = useDisclosure();

  const handleDeleteQuiz = (quizId: number): void => {
    setError(false);
    setQuizId(quizId);
    onDeleteQuizModalOpen();
  };

  const handleSubmit = (): void => {
    setIsSubmitting(true);
    setError(false);

    axiosClient
      .delete(`/community-quizzes/${quizId}`, getAuthConfig())
      .then(() => {
        setMyQuizzes(myQuizzes.filter((x) => x.id !== quizId));
        toast(deleteCommunityQuizToast());
        onDeleteQuizModalClose();
      })
      .catch(() => setError(true))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <UserProfileMyQuizzesTable
        quizzes={myQuizzes}
        isCurrentUser={isCurrentUser}
        onDeleteQuiz={handleDeleteQuiz}
      />
      <DeleteCommunityQuizModal
        isOpen={isDeleteQuizModalOpen}
        onClose={onDeleteQuizModalClose}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    </>
  );
};

export default UserProfileMyQuizzesTableContainer;
