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

const AdminCreateQuizContainer: FC = () => {
  const toast = useToast();

  const { getAuthConfig } = useContext(CurrentUserContext);
  const { data: types, isLoading: isQuizTypesLoading } = useQuizTypes();
  const { data: badges, isLoading: isBadgesLoading } = useBadges();
  const { data: continents, isLoading: isContinentsLoading } = useContinents();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (values: CreateQuizFormSubmit): void => {
    setIsSubmitting(true);
    setError("");

    const payload = {
      typeId: parseInt(values.typeId),
      badgeId: values.badgeId ? parseInt(values.badgeId) : null,
      continentId: values.continentId ? parseInt(values.continentId) : null,
      country: values.country,
      singular: values.singular,
      name: values.name,
      maxScore: parseInt(values.maxScore),
      time: parseInt(values.time),
      mapSVG: values.mapSVG,
      imageUrl: values.imageUrl,
      verb: values.verb,
      apiPath: values.apiPath,
      route: values.route,
      hasLeaderboard: values.hasLeaderboard,
      hasGrouping: values.hasGrouping,
      hasFlags: values.hasFlags,
      enabled: values.enabled,
    };

    axiosClient
      .post(`/quizzes`, payload, getAuthConfig())
      .then(() => toast(createQuizToast()))
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
    />
  );
};

export default AdminCreateQuizContainer;
