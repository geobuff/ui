import { useToast } from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";
import axiosClient from "../../axios";
import AdminQuizForm from "../../components/AdminQuizForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { quizToast } from "../../helpers/toasts";
import useBadges from "../../hooks/UseBadges";
import useContinents from "../../hooks/UseContinents";
import useQuizTypes from "../../hooks/UseQuizTypes";
import { NullInt } from "../../types/null-int";
import { QuizEditValues } from "../../types/quiz-edit-values";

export interface Props {
  editValues?: QuizEditValues;
  onClose?: () => void;
}

const AdminQuizFormContainer: FC<Props> = ({ editValues, onClose }) => {
  const toast = useToast();

  const { getAuthConfig } = useContext(CurrentUserContext);
  const { data: types } = useQuizTypes();
  const { data: badges } = useBadges();
  const { data: continents } = useContinents();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (values: QuizEditValues, { resetForm }): void => {
    setIsSubmitting(true);
    setError("");

    const badgeId: NullInt = {
      Int64: values.badgeId ? parseInt(values.badgeId) : 0,
      Valid: !!values.badgeId,
    };

    const continentId: NullInt = {
      Int64: values.continentId ? parseInt(values.continentId) : 0,
      Valid: !!values.continentId,
    };

    const payload = {
      typeId: parseInt(values.typeId),
      badgeId: badgeId,
      continentId: continentId,
      country: values.country,
      singular: values.singular,
      name: values.name,
      maxScore: parseInt(values.maxScore),
      time: parseInt(values.time),
      mapSVG: values.mapSVG,
      imageUrl: values.imageUrl,
      plural: values.plural,
      apiPath: values.apiPath,
      route: values.route,
      hasLeaderboard: values.hasLeaderboard,
      hasGrouping: values.hasGrouping,
      hasFlags: values.hasFlags,
      enabled: values.enabled,
    };

    if (editValues) {
      axiosClient
        .put(`/quizzes/${values.id}`, payload, getAuthConfig())
        .then(() => {
          toast(quizToast("Edit", "edited"));
        })
        .catch((error) => setError(error.response.data))
        .finally(() => setIsSubmitting(false));
    } else {
      axiosClient
        .post(`/quizzes`, payload, getAuthConfig())
        .then(() => {
          toast(quizToast());
          resetForm();
        })
        .catch((error) => setError(error.response.data))
        .finally(() => setIsSubmitting(false));
    }
  };

  return (
    <AdminQuizForm
      editValues={editValues}
      types={types}
      badges={badges}
      continents={continents}
      isSubmitting={isSubmitting}
      error={error}
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default AdminQuizFormContainer;
