import React, { FC, useState } from "react";

import { useDisclosure, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { DeleteModal } from "../../components/DeleteModal/DeleteModal";
import UserProfileMyQuizzesTable from "../../components/UserProfileMyQuizzes/UserProfileMyQuizzesTable";

import axiosClient from "../../axios";
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
  const [error, setError] = useState("");
  const [quizId, setQuizId] = useState(0);

  const {
    isOpen: isDeleteQuizModalOpen,
    onOpen: onDeleteQuizModalOpen,
    onClose: onDeleteQuizModalClose,
  } = useDisclosure();

  const handleDeleteQuiz = (quizId: number): void => {
    setError("");
    setQuizId(quizId);
    onDeleteQuizModalOpen();
  };

  const handleSubmit = (): void => {
    setIsSubmitting(true);
    setError("");

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
      .catch((error) => setError(error.response.data))
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
      <DeleteModal
        header="Delete Community Quiz"
        message="Are you sure you want to delete this quiz? All corresponding questions, answers and quiz plays will be deleted with it."
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
