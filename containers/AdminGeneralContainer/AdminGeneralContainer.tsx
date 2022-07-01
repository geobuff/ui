import React, { FC, useState } from "react";
import { DateTime } from "luxon";
import axiosClient from "../../axios";
import AdminGeneral from "../../components/AdminGeneral";
import { useToast } from "@chakra-ui/react";
import Papa from "papaparse";

import { TriviaQuestionTypes } from "../../types/trivia-question-types";
import {
  bulkUploadTriviaQuestionsToast,
  clearOldTriviaToast,
  createTriviaToast,
  deployUIToast,
  regenerateTriviaToast,
} from "../../helpers/toasts";
import { BackgroundTaskKey } from "../../types/background-task";
import { useSession } from "next-auth/react";
import { ManualTriviaQuestionPayload } from "../../types/manual-trivia-payload";
import axios from "axios";

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

const getTypeId = (type: TriviaQuestionTypes): number => {
  switch (type) {
    case "Text":
      return 1;
    case "Image":
      return 2;
    case "Map":
      return 3;
    case "Flag":
      return 4;
    default:
      throw Error(`Invalid trivia question type ${type}`);
  }
};

const AdminGeneralContainer: FC = () => {
  const { data: session } = useSession();

  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [regenerateDate, setRegenerateDate] = useState("");
  const [triviaQuestions, setTriviaQuestions] = useState<
    ManualTriviaQuestionPayload[]
  >();

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

  const handleTriviaFileSelect = (event: any) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setTriviaQuestions(
          results.data.map((x) => {
            const typeId = getTypeId(x["Type"]);
            const answers = x["Answers"].split(", ");
            const correctAnswer = x["Correct"];
            return {
              typeId: typeId,
              categoryId: parseInt(x["Category"]),
              question: x["Question"],
              explainer: x["Explainer"],
              imageUrl: typeId === 2 ? x["Resource"] : "",
              map: typeId === 3 ? x["Resource"] : "",
              flagCode: typeId === 4 ? x["Resource"] : "",
              answers: answers.map((a) => {
                return {
                  text: a,
                  isCorrect: a === correctAnswer,
                };
              }),
            };
          })
        );
      },
    });
  };

  const handleTriviaBulkUpload = () => {
    const requests = triviaQuestions.map((x) =>
      axiosClient.post(`/manual-trivia-questions`, x, session?.authConfig)
    );

    setIsSubmitting(true);
    axios
      .all(requests)
      .then(() => toast(bulkUploadTriviaQuestionsToast()))
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  return (
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
      onTriviaFileSelect={handleTriviaFileSelect}
      onTriviaBulkUpload={handleTriviaBulkUpload}
    />
  );
};

export default AdminGeneralContainer;
