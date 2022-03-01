import React, { FC, useState } from "react";
import { DateTime } from "luxon";
import axiosClient from "../../axios";
import AdminGeneral from "../../components/AdminGeneral";
import { useToast } from "@chakra-ui/react";
import { createTriviaToast, deployUIToast } from "../../helpers/toasts";
import { BackgroundTaskKey } from "../../types/background-task";

const {
  DeployDevWeb,
  DeployProdAll,
  DeployProdMobile,
  DeployProdWeb,
  TriviaCreate,
} = BackgroundTaskKey;

const deployProdUIMobile = process.env.NEXT_PUBLIC_DEPLOY_MOBILE_PROD_UI;
const deployProdUIWeb = process.env.NEXT_PUBLIC_DEPLOY_PROD_UI;
const deployDevUIWeb = process.env.NEXT_PUBLIC_DEPLOY_DEV_UI;
const createTrivia = "/trivia";

const getTaskSettings = (key: BackgroundTaskKey) => {
  switch (key) {
    case DeployDevWeb:
      return {
        endpoints: [deployDevUIWeb],
        toasts: [deployUIToast("Mobile Prod")],
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
        endpoints: [deployProdUIMobile],
        toasts: [deployUIToast("Mobile Prod")],
      };
    case TriviaCreate:
      return {
        endpoints: [createTrivia],
        toasts: [createTriviaToast(DateTime.now().toFormat("yyyy-MM-dd"))],
      };

    default:
      return null;
  }
};

const AdminGeneralContainer: FC = () => {
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <AdminGeneral
      onDeploy={handleDeploy}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
};

export default AdminGeneralContainer;
