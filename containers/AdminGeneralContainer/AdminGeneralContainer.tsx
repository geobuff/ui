import React, { FC, useState } from "react";
import { DateTime } from "luxon";
import axiosClient from "../../axios";
import AdminGeneral from "../../components/AdminGeneral";
import { useDisclosure, useToast } from "@chakra-ui/react";

import {
  bulkUploadToast,
  clearOldTriviaToast,
  createTriviaToast,
  deployUIToast,
  regenerateTriviaToast,
} from "../../helpers/toasts";
import { BackgroundTaskKey } from "../../types/background-task";
import { useSession } from "next-auth/react";
import axios from "axios";
import BulkUploadModal from "../../components/BulkUploadModal";
import { BulkUploadType } from "../../types/bulk-upload-type";
import { BulkUploadValues } from "../../types/bulk-upload-values";
import { CommunityQuizPayload } from "../../types/community-quiz-payload";
import { AuthUser } from "../../types/auth-user";

const {
  DeployDevWeb,
  DeployProdAll,
  DeployProdMobile,
  DeployProdWeb,
} = BackgroundTaskKey;

const deployProdUIMobile = process.env.NEXT_PUBLIC_DEPLOY_MOBILE_PROD_UI;
const deployProdUIWeb = process.env.NEXT_PUBLIC_DEPLOY_PROD_UI;
const deployDevUIWeb = process.env.NEXT_PUBLIC_DEPLOY_DEV_UI;

const NEW_TRIVIA_COUNT = 30;

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
  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      .put(`/trivia/${dateString}`, null, session?.authConfig)
      .then(() => {
        toast(regenerateTriviaToast(dateString));
        setRegenerateDate("");
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  const handleClearOldTrivia = () => {
    setError("");
    setIsSubmitting(true);

    axiosClient
      .delete(`/trivia/old/${NEW_TRIVIA_COUNT}`, session?.authConfig)
      .then(() => {
        toast(clearOldTriviaToast(NEW_TRIVIA_COUNT));
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  const handleBulkUploadSubmit = (values: BulkUploadValues) => {
    setIsSubmitting(true);
    if (values.typeId === BulkUploadType.ManualTrivia) {
      const requests = values.questions.map((x) =>
        axiosClient.post(`/manual-trivia-questions`, x, session?.authConfig)
      );

      axios
        .all(requests)
        .then(() => {
          toast(bulkUploadToast(BulkUploadType.ManualTrivia));
          onClose();
        })
        .catch((error) => setError(error.response.data))
        .finally(() => setIsSubmitting(false));
    } else {
      const payload: CommunityQuizPayload = {
        userId: user?.id,
        name: values.name,
        description: values.description,
        isPublic: values.isPublic === "true",
        maxScore: values.questions?.length || 0,
        questions: values.questions?.map((question) => ({
          id: {
            Int64: 0,
            Valid: false,
          },
          typeId: question.typeId,
          question: question.question,
          explainer: question.explainer,
          map: question.map,
          highlighted: question.highlighted,
          flagCode: question.flagCode,
          imageUrl: question.imageUrl,
          imageAttributeName: question.imageAttributeName,
          imageAttributeUrl: question.imageAttributeUrl,
          answers: question.answers,
        })),
      };

      setIsSubmitting(true);
      axiosClient
        .post("/community-quizzes", payload, session?.authConfig)
        .then(() => {
          toast(bulkUploadToast(BulkUploadType.CommunityQuiz));
          onClose();
        })
        .catch((error) => setError(error.response.data))
        .finally(() => setIsSubmitting(false));
    }
  };

  return (
    <>
      <AdminGeneral
        onDeploy={handleDeploy}
        onCreateTrivia={handleCreateTrivia}
        onRegenerateTrivia={handleRegenerateTrivia}
        onClearOldTrivia={handleClearOldTrivia}
        regenerateDate={regenerateDate}
        setRegenerateDate={setRegenerateDate}
        isSubmitting={isSubmitting}
        error={error}
        newTriviaCount={NEW_TRIVIA_COUNT}
        onBulkUploadClick={onOpen}
      />
      <BulkUploadModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleBulkUploadSubmit}
        isSubmitting={isSubmitting}
        error={error}
        setError={setError}
      />
    </>
  );
};

export default AdminGeneralContainer;
