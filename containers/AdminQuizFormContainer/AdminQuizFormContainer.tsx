import React, { FC, useContext, useState } from "react";

import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { LanguageContext } from "../../contexts/LanguageContext";

import useBadges from "../../hooks/UseBadges";
import useContinents from "../../hooks/UseContinents";
import useQuizTypes from "../../hooks/UseQuizTypes";

import AdminQuizForm from "../../components/AdminQuizForm";

import axiosClient from "../../axios";
import { genericToast } from "../../helpers/toasts";
import { CreateEditQuizPayload } from "../../types/create-edit-quiz-payload";
import { NullInt } from "../../types/null-int";
import { QuizEditValues } from "../../types/quiz-edit-values";

export interface Props {
  editValues?: QuizEditValues;
  onClose?: () => void;
}

const AdminQuizFormContainer: FC<Props> = ({ editValues, onClose }) => {
  const toast = useToast();
  const { t } = useContext(LanguageContext);

  const { data } = useSession();
  const session = data as any;

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
          toast(
            genericToast(
              t.toasts.editQuizTitle,
              t.toasts.editQuizDescription,
              9000
            )
          );
        })
        .catch((error) => setError(error.response.data))
        .finally(() => setIsSubmitting(false));
    } else {
      axiosClient
        .post(`/quizzes`, payload, session?.authConfig)
        .then(() => {
          toast(
            genericToast(
              t.toasts.createQuizTitle,
              t.toasts.createQuizDescription,
              9000
            )
          );
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
