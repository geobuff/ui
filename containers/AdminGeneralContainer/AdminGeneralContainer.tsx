import React, { FC, useContext, useState } from "react";

import { useDisclosure, useToast } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import AdminGeneral from "../../components/AdminGeneral";
import BulkUploadModal from "../../components/BulkUploadModal";

import axiosClient from "../../axios";
import { genericToast } from "../../helpers/toasts";
import { AuthUser } from "../../types/auth-user";
import { BackgroundTaskKey } from "../../types/background-task";
import { BulkUploadType } from "../../types/bulk-upload-type";
import { BulkUploadValues } from "../../types/bulk-upload-values";
import { CommunityQuizPayload } from "../../types/community-quiz-payload";

const { DeployDevWeb, DeployProdAll, DeployProdMobile, DeployProdWeb } =
  BackgroundTaskKey;

const deployProdUIMobile = process.env.NEXT_PUBLIC_DEPLOY_MOBILE_PROD_UI;
const deployProdUIWeb = process.env.NEXT_PUBLIC_DEPLOY_PROD_UI;
const deployDevUIWeb = process.env.NEXT_PUBLIC_DEPLOY_DEV_UI;

const NEW_TRIVIA_COUNT = 30;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const AdminGeneralContainer: FC = () => {
  const { t } = useContext(LanguageContext);

  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [regenerateDate, setRegenerateDate] = useState("");

  const getTaskSettings = (key: BackgroundTaskKey) => {
    switch (key) {
      case DeployDevWeb:
        return {
          endpoints: [deployDevUIWeb],
          toasts: [
            genericToast(t.deployUITitle, t.deployDevUIDescription, 9000),
          ],
        };
      case DeployProdAll:
        return {
          endpoints: [deployProdUIWeb, deployProdUIMobile],
          toasts: [
            genericToast(t.deployUITitle, t.deployProdUIDescription, 9000),
            genericToast(
              t.deployUITitle,
              t.deployMobileProdUIDescription,
              9000
            ),
          ],
        };
      case DeployProdMobile:
        return {
          endpoints: [deployProdUIMobile],
          toasts: [
            genericToast(
              t.deployUITitle,
              t.deployMobileProdUIDescription,
              9000
            ),
          ],
        };
      case DeployProdWeb:
        return {
          endpoints: [deployProdUIWeb],
          toasts: [
            genericToast(t.deployUITitle, t.deployProdUIDescription, 9000),
          ],
        };
      default:
        return null;
    }
  };

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
        toast(
          genericToast(
            t.toasts.createTriviaTitle,
            `${t.toasts.createTriviaDescription} ${DateTime.now().toFormat(
              "yyyy-MM-dd"
            )}.`,
            9000
          )
        );
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
        toast(
          genericToast(
            t.toasts.regenerateTriviaTitle,
            `${t.toasts.regenerateTriviaDescription} ${dateString}.`
          )
        );
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
        toast(
          genericToast(
            "Clear Old Trivia",
            `${t.toasts.clearOldTriviaDescriptionOne} ${NEW_TRIVIA_COUNT} ${t.toasts.clearOldTriviaDescriptionTwo}`,
            9000
          )
        );
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  const handleBulkUploadSubmit = async (values: BulkUploadValues) => {
    setIsSubmitting(true);
    if (values.typeId === BulkUploadType.ManualTrivia) {
      try {
        for (let i = 0; i < values.questions.length; i++) {
          await axiosClient.post(
            `/manual-trivia-questions`,
            values.questions[i],
            session?.authConfig
          );

          await delay(1000);
        }
        toast(
          genericToast(
            t.toasts.bulkUploadTitle,
            t.toasts.bulkUploadTriviaQuestionsDescription
          )
        );
      } catch (error) {
        setError(error.message);
      }

      onClose();
      setIsSubmitting(false);
    } else {
      const payload: CommunityQuizPayload = {
        userId: user?.id,
        name: values.name,
        description: values.description,
        isPublic: values.isPublic === "true",
        isVerified: values.isVerified === "true",
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
          imageWidth: question.imageWidth,
          imageHeight: question.imageHeight,
          imageAlt: question.imageAlt,
          answers: question.answers,
        })),
      };

      setIsSubmitting(true);
      axiosClient
        .post("/community-quizzes", payload, session?.authConfig)
        .then(() => {
          toast(
            genericToast(
              t.toasts.bulkUploadTitle,
              t.toasts.bulkUploadCommunityQuizDescription
            )
          );
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
