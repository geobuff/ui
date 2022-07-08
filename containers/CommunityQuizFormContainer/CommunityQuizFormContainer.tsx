import React, { FC, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import axiosClient from "../../axios/axiosClient";
import { createCommunityQuizToast } from "../../helpers/toasts";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";

import CommunityQuizForm from "../../components/CommunityQuizForm";
import { CommunityQuizFormSubmit } from "../../types/community-quiz-form-submit";
import { CommunityQuizPayload } from "../../types/community-quiz-payload";
import { useSession } from "next-auth/react";
import { AuthUser } from "../../types/auth-user";
import axios from "axios";
import { UnsplashImage } from "../../types/unsplash-image";
import { TriviaQuestionTypeValues } from "../../types/trivia-question-types";

const CommunityQuizFormContainer: FC = () => {
  const { data: types, isLoading: isTypesLoading } = useTriviaQuestionTypes();

  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const toast = useToast();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [images, setImages] = useState<UnsplashImage[]>();
  const [isSearchingImages, setIsSearchingImages] = useState(false);
  const [isEmptyImageSearch, setIsEmptyImageSearch] = useState(false);

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
        return {
          id: {
            Int64: 0,
            Valid: false,
          },
          typeId: typeId,
          question: question.question,
          explainer: question.explainer,
          imageUrl:
            typeId === TriviaQuestionTypeValues.Image ? question.imageUrl : "",
          imageAttributeName:
            typeId === TriviaQuestionTypeValues.Image
              ? question.imageAttributeName
              : "",
          imageAttributeUrl:
            typeId === TriviaQuestionTypeValues.Image
              ? question.imageAttributeUrl
              : "",
          flagCode:
            typeId === TriviaQuestionTypeValues.Flag ? question.flagCode : "",
          map: typeId === TriviaQuestionTypeValues.Map ? question.map : "",
          highlighted:
            typeId === TriviaQuestionTypeValues.Map ? question.highlighted : "",
          answers: question.answers,
        };
      }),
    };

    await axios.all(
      values.questions.map(
        (x) =>
          parseInt(x.typeId) === TriviaQuestionTypeValues.Image &&
          axios.get(
            `${x.imageDownloadLocation}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
          )
      )
    );

    axiosClient
      .post(`/community-quizzes`, payload, session?.authConfig)
      .then(() => {
        toast(createCommunityQuizToast());
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
              url: x.urls.small,
              attributeName: x.user?.name,
              attributeUrl: `https://unsplash.com/@${x.user?.username}?utm_source=GeoBuff&utm_medium=referral`,
              downloadLocation: x.links["download_location"],
            };
          })
        );
        setIsEmptyImageSearch(response.data.results.length === 0);
      })
      .catch((error) => setError(error.response.data))
      .finally(() => setIsSearchingImages(false));
  };

  return (
    <CommunityQuizForm
      error={error}
      types={types}
      isLoading={isTypesLoading}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      images={images}
      isSearchingImages={isSearchingImages}
      isEmptyImageSearch={isEmptyImageSearch}
      onChangeSearchImage={handleChangeSearchImage}
    />
  );
};

export default CommunityQuizFormContainer;
