import { useDisclosure, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { FC, useState } from "react";
import axiosClient from "../../axios";
import DeleteCommunityQuizModal from "../../components/DeleteCommunityQuizModal";
import UserProfileMyQuizzesTable from "../../components/UserProfileMyQuizzes/UserProfileMyQuizzesTable";
import { genericToast } from "../../helpers/toasts";
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
  const { data: session } = useSession();

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
      .delete(`/community-quizzes/${quizId}`, session?.authConfig)
      .then(() => {
        setMyQuizzes(myQuizzes.filter((x) => x.id !== quizId));
        toast(
          genericToast(
            "Delete Community Quiz",
            "Successfully deleted community quiz.",
            9000
          )
        );
        onDeleteQuizModalClose();
      })
      .catch(() => setError(true))
      .finally(() => setIsSubmitting(false));
  };

  const handleCopyLink = (quizId: number, name: string): void => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_SITE_URL}/community-quiz/${quizId}`
    );

    toast(
      genericToast(
        `Copy ${name} Link`,
        "Successfully copied link to clipboard."
      )
    );
  };

  return (
    <>
      <UserProfileMyQuizzesTable
        quizzes={myQuizzes}
        isCurrentUser={isCurrentUser}
        onDeleteQuiz={handleDeleteQuiz}
        onCopyLink={handleCopyLink}
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
