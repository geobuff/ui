import React, { FC, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import axiosClient from "../../axios/axiosClient";
import { editCommunityQuizToast } from "../../helpers/toasts";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";

import { CommunityQuizFormSubmit } from "../../types/community-quiz-form-submit";
import {
  CommunityQuizPayload,
  CommunityQuizQuestionPayload,
} from "../../types/community-quiz-payload";
import { GetCommunityQuiz } from "../../types/get-community-quiz-dto";
import EditCommunityQuizForm from "../../components/EditCommunityQuizForm";
import { useSession } from "next-auth/react";
import { AuthUser } from "../../types/auth-user";
import axios from "axios";
import { UnsplashImage } from "../../types/unsplash-image";
import { TriviaQuestionTypeValues } from "../../types/trivia-question-types";

interface Props {
  quizId: number;
}

const EditCommunityQuizFormContainer: FC<Props> = ({ quizId }) => {
  const { data: types, isLoading: isQuestionTypesLoading } =
    useTriviaQuestionTypes();

  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const toast = useToast();
  const router = useRouter();

  const [quiz, setQuiz] = useState<GetCommunityQuiz>();
  const [isQuizLoading, setIsQuizLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [images, setImages] = useState<UnsplashImage[]>();
  const [isSearchingImages, setIsSearchingImages] = useState(false);
  const [isEmptyImageSearch, setIsEmptyImageSearch] = useState(false);

  useEffect(() => {
    axiosClient
      .get(`/community-quizzes/${quizId}`)
      .then((response) => setQuiz(response.data))
      .catch((error) => setError(error.response.data))
      .finally(() => setIsQuizLoading(false));
  }, []);

  const getValuesFromQuiz = (
    quiz: GetCommunityQuiz
  ): CommunityQuizFormSubmit => {
    return {
      name: quiz.name,
      description: quiz.description,
      isPublic: quiz.isPublic.toString(),
      questions: quiz.questions.map((q) => {
        return {
          id: q.id,
          typeId: q.typeId.toString(),
          question: q.question,
          explainer: q.explainer,
          imageUrl: q.imageUrl,
          imageAttributeName: q.imageAttributeName,
          imageAttributeUrl: q.imageAttributeUrl,
          imageDownloadLocation: "",
          imageWidth: q.imageWidth,
          imageHeight: q.imageHeight,
          imageAlt: q.imageAlt,
          flagCode: q.flagCode,
          map: q.map,
          highlighted: q.highlighted,
          correctAnswer: q.answers?.findIndex((a) => a.isCorrect) ?? 0,
          answers: q.answers.map((a) => {
            return {
              text: a.text,
              isCorrect: a.isCorrect,
              flagCode: a.flagCode,
            };
          }),
        };
      }),
    };
  };

  const handleSubmit = async (
    values: CommunityQuizFormSubmit
  ): Promise<void> => {
    setIsSubmitting(true);

    const payload: CommunityQuizPayload = {
      userId: user.id,
      name: values.name,
      description: values.description,
      isPublic: values.isPublic === "true",
      maxScore: values.questions?.length || 0,
      questions: values.questions?.map((question) => {
        const typeId = parseInt(question.typeId);
        const result: CommunityQuizQuestionPayload = {
          id: {
            Int64: question.id ?? 0,
            Valid: !!question.id,
          },
          typeId: typeId,
          question: question.question,
          explainer: question.explainer,
          answers: question.answers,
        };

        if (typeId === TriviaQuestionTypeValues.Image) {
          const originalQuestion = quiz.questions.find(
            (x) => x.id === question.id
          );
          if (
            originalQuestion !== undefined &&
            originalQuestion.imageUrl === question.imageUrl
          ) {
            result.imageUrl = question.imageUrl;
            result.imageAttributeName = originalQuestion.imageAttributeName;
            result.imageAttributeUrl = originalQuestion.imageAttributeUrl;
            result.imageWidth = originalQuestion.imageWidth;
            result.imageHeight = originalQuestion.imageHeight;
            result.imageAlt = originalQuestion.imageAlt;
          } else {
            result.imageUrl = question.imageUrl;
            result.imageAttributeName = question.imageAttributeName;
            result.imageAttributeUrl = question.imageAttributeUrl;
            result.imageWidth = question.imageWidth;
            result.imageHeight = question.imageHeight;
            result.imageAlt = question.imageAlt;
          }
        } else if (typeId === TriviaQuestionTypeValues.Flag) {
          result.flagCode = question.flagCode;
        } else if (typeId === TriviaQuestionTypeValues.Map) {
          result.map = question.map;
          result.highlighted = question.highlighted;
        }

        return result;
      }),
    };

    await axios.all(
      values.questions.map(
        (x) =>
          parseInt(x.typeId) === TriviaQuestionTypeValues.Image &&
          x.imageDownloadLocation &&
          axios.get(
            `${x.imageDownloadLocation}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
          )
      )
    );

    axiosClient
      .put(`/community-quizzes/${quizId}`, payload, session?.authConfig)
      .then(() => {
        toast(editCommunityQuizToast());
        router.push(`/profile/${user?.id}`);
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSubmitting(false));
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
    <EditCommunityQuizForm
      values={!isQuizLoading && getValuesFromQuiz(quiz)}
      error={error}
      types={types}
      isLoading={isQuestionTypesLoading || isQuizLoading}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      images={images}
      isSearchingImages={isSearchingImages}
      isEmptyImageSearch={isEmptyImageSearch}
      onChangeSearchImage={handleChangeSearchImage}
    />
  );
};

export default EditCommunityQuizFormContainer;
