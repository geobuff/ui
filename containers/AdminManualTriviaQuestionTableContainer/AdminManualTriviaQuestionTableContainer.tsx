import React, { FC, useContext, useEffect, useState } from "react";

import { useDisclosure, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { LanguageContext } from "../../contexts/LanguageContext";

import useMaps from "../../hooks/UseMaps";
import useTriviaQuestionCategories from "../../hooks/UseTriviaQuestionCategories";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";

import AdminManualTriviaQuestions from "../../components/AdminManualTriviaQuestions";
import CreateEditTriviaQuestionModal from "../../components/CreateEditTriviaQuestionModal";
import { DeleteModal } from "../../components/DeleteModal/DeleteModal";

import axios from "../../axios";
import axiosClient from "../../axios";
import { genericToast } from "../../helpers/toasts";
import { ManualTriviaAnswer } from "../../types/manual-trivia-answer";
import { ManualTriviaQuestionPayload } from "../../types/manual-trivia-payload";
import { ManualTriviaQuestion } from "../../types/manual-trivia-question";
import { ManualTriviaQuestionEditValues } from "../../types/manual-trivia-question-edit-values";
import { NullTime } from "../../types/null-time";
import { TriviaQuestionFilterParams } from "../../types/trivia-question-filter-param";
import { TriviaQuestionTypeValues } from "../../types/trivia-question-types";
import { UnsplashImage } from "../../types/unsplash-image";

const AdminManualTriviaQuestionTableContainer: FC = () => {
  const { t } = useContext(LanguageContext);

  const toast = useToast();

  const { data: types, isLoading: isTypesLoading } = useTriviaQuestionTypes();
  const { data: maps, isLoading: isMapsLoading } = useMaps();
  const { data: session, status } = useSession();

  const { data: categories, isLoading: isCategoriesLoading } =
    useTriviaQuestionCategories();

  const [filterParams, setFilterParams] = useState<TriviaQuestionFilterParams>({
    page: 0,
    limit: 10,
  });

  const [entries, setEntries] = useState<ManualTriviaQuestion[]>([]);
  const [hasMoreEntries, setHasMoreEntries] = useState(false);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [questionId, setQuestionId] = useState(0);
  const [images, setImages] = useState<UnsplashImage[]>();
  const [isSearchingImages, setIsSearchingImages] = useState(false);
  const [isEmptyImageSearch, setIsEmptyImageSearch] = useState(false);

  const [selectedQuestion, setSelectedQuestion] =
    useState<ManualTriviaQuestionEditValues>();

  const {
    isOpen: isDeleteQuestionModalOpen,
    onOpen: onDeleteQuestionModalOpen,
    onClose: onDeleteQuestionModalClose,
  } = useDisclosure();

  const {
    isOpen: isCreateEditQuestionModalOpen,
    onOpen: onCreateEditQuestionModalOpen,
    onClose: onCreateEditQuestionModalClose,
  } = useDisclosure();

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoadingEntries(true);
      axiosClient
        .post(`/manual-trivia-questions/all`, filterParams, session?.authConfig)
        .then((response) => {
          setEntries(response.data.questions);
          setHasMoreEntries(response.data.hasMore);
          setSuccess(false);
        })
        .catch((error) => setError(error.response.data))
        .finally(() => setIsLoadingEntries(false));
    }
  }, [status, session, filterParams, success]);

  const handleCreateQuestionClick = () => {
    setSelectedQuestion(null);
    onCreateEditQuestionModalOpen();
  };

  const handleEditQuestionClick = (question: ManualTriviaQuestion) => {
    setSelectedQuestion({
      id: question.id.toString(),
      typeId: question.typeId.toString(),
      categoryId: question.categoryId.toString(),
      question: question.question,
      explainer: question.explainer,
      answerOneText: question.answers[0]?.text || "",
      answerOneFlagCode: question.answers[0]?.flagCode || "",
      answerTwoText: question.answers[1]?.text || "",
      answerTwoFlagCode: question.answers[1]?.flagCode || "",
      answerThreeText: question?.answers[2]?.text || "",
      answerThreeFlagCode: question?.answers[2]?.flagCode || "",
      answerFourText: question?.answers[3]?.text || "",
      answerFourFlagCode: question?.answers[3]?.flagCode || "",
      correctAnswer: question.answers.findIndex((a) => a.isCorrect) + 1,
      hasFlagAnswers: !!question.answers.find((a) => a.flagCode) || false,
      imageUrl: question?.imageUrl || "",
      imageAttributeName: question?.imageAttributeName || "",
      imageAttributeUrl: question?.imageAttributeUrl || "",
      imageDownloadLocation: "",
      imageWidth: question?.imageWidth || 0,
      imageHeight: question?.imageHeight || 0,
      imageAlt: question?.imageAlt || "",
      flagCode: question?.flagCode || "",
      map: question?.map || "",
      highlighted: question?.highlighted || "",
      quizDate: question?.quizDate.Valid
        ? question?.quizDate.Time.toString()
        : null,
      answers: question?.answers || [],
    });

    onCreateEditQuestionModalOpen();
  };

  const handleDeleteQuestion = (questionId: number): void => {
    setQuestionId(questionId);
    onDeleteQuestionModalOpen();
  };

  const handleDeleteSubmit = (): void => {
    setIsSubmitting(true);
    setError("");

    axiosClient
      .delete(`/manual-trivia-questions/${questionId}`, session?.authConfig)
      .then(() => {
        setSuccess(true);
        onDeleteQuestionModalClose();
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
  };

  const handleCreateEditSubmit = async (
    values: ManualTriviaQuestionEditValues,
    { resetForm }
  ): Promise<void> => {
    setIsSubmitting(true);
    setError("");

    const answers: ManualTriviaAnswer[] = [
      {
        id: values.answers ? values.answers[0]?.id : 0,
        text: values.answerOneText,
        isCorrect: values.correctAnswer === 1,
        flagCode: values.answerOneFlagCode,
        manualTriviaQuestionId: values.id,
      },
      {
        id: values.answers ? values.answers[1]?.id : 0,
        text: values.answerTwoText,
        isCorrect: values.correctAnswer === 2,
        flagCode: values.answerTwoFlagCode,
        manualTriviaQuestionId: values.id,
      },
    ];

    if (values.answerThreeText) {
      answers.push({
        id: values.answers ? values.answers[2]?.id : 0,
        text: values.answerThreeText,
        isCorrect: values.correctAnswer === 3,
        flagCode: values.answerThreeFlagCode,
        manualTriviaQuestionId: values.id,
      });
    }

    if (values.answerFourText) {
      answers.push({
        id: values.answers ? values.answers[3]?.id : 0,
        text: values.answerFourText,
        isCorrect: values.correctAnswer === 4,
        flagCode: values.answerFourFlagCode,
        manualTriviaQuestionId: values.id,
      });
    }

    const quizDate: NullTime = {
      Valid: !!values.quizDate,
      Time: values.quizDate ? new Date(values.quizDate) : new Date(),
    };

    const typeId = parseInt(values.typeId);
    const payload: ManualTriviaQuestionPayload = {
      typeId: typeId,
      categoryId: parseInt(values.categoryId),
      question: values.question,
      explainer: values.explainer,
      answers: answers,
      quizDate: quizDate,
    };

    if (typeId === TriviaQuestionTypeValues.Image) {
      if (selectedQuestion && selectedQuestion.imageUrl === values.imageUrl) {
        payload.imageUrl = values.imageUrl;
        payload.imageAttributeName = selectedQuestion.imageAttributeName;
        payload.imageAttributeUrl = selectedQuestion.imageAttributeUrl;
        payload.imageWidth = selectedQuestion.imageWidth;
        payload.imageHeight = selectedQuestion.imageHeight;
        payload.imageAlt = selectedQuestion.imageAlt;
      } else {
        payload.imageUrl = values.imageUrl;
        payload.imageAttributeName = values.imageAttributeName;
        payload.imageAttributeUrl = values.imageAttributeUrl;
        payload.imageWidth = values.imageWidth;
        payload.imageHeight = values.imageHeight;
        payload.imageAlt = values.imageAlt;
      }

      if (values.imageDownloadLocation) {
        await axios.get(
          `${values.imageDownloadLocation}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        );
      }
    } else if (typeId === TriviaQuestionTypeValues.Flag) {
      payload.flagCode = values.flagCode;
    } else if (typeId === TriviaQuestionTypeValues.Map) {
      payload.map = values.map;
      payload.highlighted = values.highlighted;
    }

    if (selectedQuestion) {
      axiosClient
        .put(
          `/manual-trivia-questions/${values.id}`,
          payload,
          session?.authConfig
        )
        .then(() => {
          setSuccess(true);
          toast(
            genericToast(
              t.toasts.editManualTriviaQuestionTitle,
              t.toasts.editManualTriviaQuestionDescription,
              9000
            )
          );
        })
        .catch((error) => setError(error.response.data))
        .finally(() => setIsSubmitting(false));
    } else {
      axiosClient
        .post(`/manual-trivia-questions`, payload, session?.authConfig)
        .then(() => {
          setSuccess(true);
          toast(
            genericToast(
              t.toasts.createManualTriviaQuestionTitle,
              t.toasts.createManualTriviaQuestionDescription,
              9000
            )
          );
          resetForm();
        })
        .catch((error) => setError(error.response.data))
        .finally(() => setIsSubmitting(false));
    }
  };

  const handleChangeSearchImage = (query: string): void => {
    setImages([]);
    setIsEmptyImageSearch(false);
    setIsSearchingImages(true);
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      )
      .then((response) => {
        setImages(
          response.data.results.map((x) => {
            return {
              url: x.urls.regular,
              attributeName: x.user?.name,
              attributeUrl: `https://unsplash.com/@${x.user?.username}?utm_source=GeoBuff&utm_medium=referral`,
              downloadLocation: x.links["download_location"],
              width: x.width,
              height: x.height,
              alt: x["alt_description"],
            };
          })
        );
        setIsEmptyImageSearch(response.data.results.length === 0);
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSearchingImages(false));
  };

  return (
    <>
      <AdminManualTriviaQuestions
        entries={entries}
        hasMoreEntries={hasMoreEntries}
        types={types}
        categories={categories}
        isLoading={isLoadingEntries || isTypesLoading || isCategoriesLoading}
        filterParams={filterParams}
        error={error}
        onChangeFilterParams={setFilterParams}
        onCreateQuestionClick={handleCreateQuestionClick}
        onEditQuestionClick={handleEditQuestionClick}
        onDeleteQuestionClick={handleDeleteQuestion}
      />
      <DeleteModal
        header="Delete Manual Trivia Question"
        message="Are you sure you want to delete this manual trivia question? All corresponding answers will be deleted with it."
        isOpen={isDeleteQuestionModalOpen}
        onClose={onDeleteQuestionModalClose}
        onSubmit={handleDeleteSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
      <CreateEditTriviaQuestionModal
        types={types}
        categories={categories}
        editValues={selectedQuestion}
        isOpen={isCreateEditQuestionModalOpen}
        isLoading={isTypesLoading || isCategoriesLoading || isMapsLoading}
        isSubmitting={isSubmitting}
        error={error}
        onSubmit={handleCreateEditSubmit}
        onClose={onCreateEditQuestionModalClose}
        images={images}
        isSearchingImages={isSearchingImages}
        isEmptyImageSearch={isEmptyImageSearch}
        onChangeSearchImage={handleChangeSearchImage}
        maps={maps}
      />
    </>
  );
};

export default AdminManualTriviaQuestionTableContainer;
