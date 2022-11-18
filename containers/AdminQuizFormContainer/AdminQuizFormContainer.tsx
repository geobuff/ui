import React, { FC, useState } from "react";

import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import useBadges from "../../hooks/UseBadges";
import useContinents from "../../hooks/UseContinents";
import useQuizTypes from "../../hooks/UseQuizTypes";

import AdminQuizForm from "../../components/AdminQuizForm";

import axiosClient from "../../axios";
import { quizToast } from "../../helpers/toasts";
import { CreateEditQuizPayload } from "../../types/create-edit-quiz-payload";
import { NullInt } from "../../types/null-int";
import { QuizEditValues } from "../../types/quiz-edit-values";

export interface Props {
  editValues?: QuizEditValues;
  onClose?: () => void;
}

const AdminQuizFormContainer: FC<Props> = ({ editValues, onClose }) => {
  const toast = useToast();

  const { data: session } = useSession();

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

    const payload: CreateEditQuizPayload = {
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
      hasLeaderboard: values.hasLeaderboard === "true",
      hasGrouping: values.hasGrouping === "true",
      hasFlags: values.hasFlags === "true",
      enabled: values.enabled === "true",
    };

    if (editValues) {
      axiosClient
        .put(`/quizzes/${values.id}`, payload, session?.authConfig)
        .then(() => {
          toast(quizToast("Edit", "edited"));
        })
        .catch((error) => setError(error.response.data))
        .finally(() => setIsSubmitting(false));
    } else {
      axiosClient
        .post(`/quizzes`, payload, session?.authConfig)
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
