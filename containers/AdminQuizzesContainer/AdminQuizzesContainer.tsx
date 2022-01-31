import React, { FC, useContext, useState } from "react";
import axiosClient from "../../axios";
import AdminQuizTable from "../../components/AdminQuizTable";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import useQuizzes from "../../hooks/UseQuizzes";

const AdminQuizzesContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);
  const { quizzes, isLoading } = useQuizzes();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleEnabled = (quizId: number): void => {
    setIsSubmitting(true);
    axiosClient
      .put(`/quizzes/enabled/${quizId}`, null, getAuthConfig())
      .then(() => {
        const quiz = quizzes.find((x) => x.id === quizId);
        const index = quizzes.indexOf(quiz);
        quizzes[index].enabled = !quizzes[index].enabled;
      })
      .finally(() => setIsSubmitting(false));
  };

  if (isLoading) {
    return null;
  }

  return (
    <AdminQuizTable
      quizzes={quizzes}
      isSubmitting={isSubmitting}
      onToggleEnabled={handleToggleEnabled}
    />
  );
};

export default AdminQuizzesContainer;
