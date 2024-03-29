import React, { FC, useContext, useState } from "react";

import { DeleteModal } from "@geobuff/buff-ui/components";

import { useDisclosure, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { LanguageContext } from "../contexts/LanguageContext";

import axiosClient from "../axios";
import { genericToast } from "../helpers/toasts";
import { CommunityQuiz } from "../types/community-quiz-dto";
import { UserProfileMyQuizzesTableContainer } from "./UserProfileMyQuizzesTableContainer";

interface Props {
  quizzes?: CommunityQuiz[];
  isLoading?: boolean;
  isCurrentUser?: boolean;
}

export const UserProfileMyQuizzesCardContainer: FC<Props> = ({
  quizzes = [],
  isLoading = false,
  isCurrentUser = false,
}) => {
  const { t } = useContext(LanguageContext);

  const toast = useToast();
  const { data } = useSession();
  const session = data as any;

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
            t.toasts.deleteCommunityQuizTitle,
            t.toasts.deleteCommunityQuizDescription,
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
        `${t.toasts.copyLinkTitleOne} ${name} ${t.toasts.copyLinkTitleTwo}`,
        t.toasts.copyLinkDescription
      )
    );
  };

  return (
    <>
      <UserProfileMyQuizzesTableContainer
        quizzes={myQuizzes}
        isLoading={isLoading}
        isCurrentUser={isCurrentUser}
        onDeleteQuiz={handleDeleteQuiz}
        onCopyLink={handleCopyLink}
      />
      <DeleteModal
        header={t.deleteCommunityQuizModal.header}
        message={t.deleteCommunityQuizModal.message}
        isOpen={isDeleteQuizModalOpen}
        onClose={onDeleteQuizModalClose}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    </>
  );
};
