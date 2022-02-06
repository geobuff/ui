import React, { FC, useState } from "react";
import { DateTime } from "luxon";
import axiosClient from "../../axios";
import AdminGeneral from "../../components/AdminGeneral";
import { useToast } from "@chakra-ui/react";
import { createTriviaToast, deployUIToast } from "../../helpers/toasts";

const AdminGeneralContainer: FC = () => {
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleDevUIDeploy = () => {
    setError("");
    setIsSubmitting(true);
    axiosClient
      .post(process.env.NEXT_PUBLIC_DEPLOY_DEV_UI)
      .then(() => toast(deployUIToast("Dev")))
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  const handleProdUIDeploy = () => {
    setError("");
    setIsSubmitting(true);
    axiosClient
      .post(process.env.NEXT_PUBLIC_DEPLOY_PROD_UI)
      .then(() => toast(deployUIToast("Prod")))
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  const handleMobileProdUIDeploy = () => {
    setError("");
    setIsSubmitting(true);
    axiosClient
      .post(process.env.NEXT_PUBLIC_DEPLOY_MOBILE_PROD_UI)
      .then(() => toast(deployUIToast("Mobile Prod")))
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  const handleCreateTrivia = () => {
    setError("");
    setIsSubmitting(true);
    axiosClient
      .post(`/trivia`)
      .then(() =>
        toast(createTriviaToast(DateTime.now().toFormat("yyyy-MM-dd")))
      )
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <AdminGeneral
      onDevUIDeploy={handleDevUIDeploy}
      onProdUIDeploy={handleProdUIDeploy}
      onMobileProdUIDeploy={handleMobileProdUIDeploy}
      onCreateTrivia={handleCreateTrivia}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
};

export default AdminGeneralContainer;
