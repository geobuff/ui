import React, { FC, useContext, useState } from "react";
import { DateTime } from "luxon";
import axiosClient from "../../axios";
import AdminGeneral from "../../components/AdminGeneral";
import { useToast } from "@chakra-ui/react";
import {
  createTriviaToast,
  deployUIToast,
  regenerateTriviaToast,
} from "../../helpers/toasts";
import { BackgroundTaskKey } from "../../types/background-task";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const {
  DeployDevWeb,
  DeployProdAll,
  DeployProdMobile,
  DeployProdWeb,
} = BackgroundTaskKey;

const deployProdUIMobile = process.env.NEXT_PUBLIC_DEPLOY_MOBILE_PROD_UI;
const deployProdUIWeb = process.env.NEXT_PUBLIC_DEPLOY_PROD_UI;
const deployDevUIWeb = process.env.NEXT_PUBLIC_DEPLOY_DEV_UI;

const getTaskSettings = (key: BackgroundTaskKey) => {
  switch (key) {
    case DeployDevWeb:
      return {
        endpoints: [deployDevUIWeb],
        toasts: [deployUIToast("Web Dev")],
      };
    case DeployProdAll:
      return {
        endpoints: [deployProdUIWeb, deployProdUIMobile],
        toasts: [deployUIToast("Web Prod"), deployUIToast("Mobile Prod")],
      };
    case DeployProdMobile:
      return {
        endpoints: [deployProdUIMobile],
        toasts: [deployUIToast("Mobile Prod")],
      };
    case DeployProdWeb:
      return {
        endpoints: [deployProdUIWeb],
        toasts: [deployUIToast("Web Prod")],
      };
    default:
      return null;
  }
};

const AdminGeneralContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);

  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [regenerateDate, setRegenerateDate] = useState("");

  const handleDeploy = (key: BackgroundTaskKey) => {
    const { endpoints, toasts } = getTaskSettings(key);

    setError("");
    setIsSubmitting(true);

    endpoints.forEach((endpoint, index) => {
      axiosClient
        .post(endpoint)
        .then(() => toast(toasts[index]))
        .catch((error) => setError(error.response.data))
        .finally(() => setIsSubmitting(false));
    });
  };

  const handleCreateTrivia = () => {
    setError("");
    setIsSubmitting(true);

    axiosClient
      .post("/trivia")
      .then(() => {
        toast(createTriviaToast(DateTime.now().toFormat("yyyy-MM-dd")));
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  const handleRegenerateTrivia = () => {
    setError("");
    setIsSubmitting(true);
    const date = new Date(regenerateDate);
    date.setDate(date.getDate() + 1);
    const dateString = date.toISOString().split("T")[0];

    axiosClient
      .put(`/trivia/${dateString}`, null, getAuthConfig())
      .then(() => {
        toast(regenerateTriviaToast(dateString));
        setRegenerateDate("");
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <AdminGeneral
      onDeploy={handleDeploy}
      onCreateTrivia={handleCreateTrivia}
      onRegenerateTrivia={handleRegenerateTrivia}
      regenerateDate={regenerateDate}
      setRegenerateDate={setRegenerateDate}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
};

export default AdminGeneralContainer;
