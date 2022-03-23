import { useToast } from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";
import axiosClient from "../../axios";
import AdminCreateQuizForm from "../../components/AdminCreateQuizForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { createQuizToast } from "../../helpers/toasts";
import useBadges from "../../hooks/UseBadges";
import useContinents from "../../hooks/UseContinents";
import useQuizTypes from "../../hooks/UseQuizTypes";
import { CreateQuizFormSubmit } from "../../types/create-quiz-form-submit";
import { NullInt } from "../../types/null-int";

export interface Props {
  onClose?: () => void;
}

const AdminCreateQuizContainer: FC<Props> = ({ onClose }) => {
  const toast = useToast();

  const { getAuthConfig } = useContext(CurrentUserContext);
  const { data: types, isLoading: isQuizTypesLoading } = useQuizTypes();
  const { data: badges, isLoading: isBadgesLoading } = useBadges();
  const { data: continents, isLoading: isContinentsLoading } = useContinents();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (values: CreateQuizFormSubmit, { resetForm }): void => {
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
      hasLeaderboard: values.hasLeaderboard === "true",
      hasGrouping: values.hasGrouping === "true",
      hasFlags: values.hasFlags === "true",
      enabled: values.enabled === "true",
    };

    axiosClient
      .post(`/quizzes`, payload, getAuthConfig())
      .then(() => {
        toast(createQuizToast());
        resetForm();
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  if (isQuizTypesLoading || isBadgesLoading || isContinentsLoading) {
    return null;
  }

  return (
    <AdminCreateQuizForm
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

export default AdminCreateQuizContainer;
