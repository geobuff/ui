import React, { FC, useContext, useState } from "react";

import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { LanguageContext } from "../../contexts/LanguageContext";

import useMaps from "../../hooks/UseMaps";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";

import CommunityQuizForm from "../../components/CommunityQuizForm";

import axiosClient from "../../axios/axiosClient";
import { genericToast } from "../../helpers/toasts";
import { AuthUser } from "../../types/auth-user";
import { CommunityQuizFormSubmit } from "../../types/community-quiz-form-submit";
import {
  CommunityQuizPayload,
  CommunityQuizQuestionPayload,
} from "../../types/community-quiz-payload";
import { TriviaQuestionTypeValues } from "../../types/trivia-question-types";
import { UnsplashImage } from "../../types/unsplash-image";

const CommunityQuizFormContainer: FC = () => {
  const { t } = useContext(LanguageContext);

  const { data: types, isLoading: isTypesLoading } = useTriviaQuestionTypes();
  const { data: maps, isLoading: isMapsLoading } = useMaps();

  const { data } = useSession();
  const session = data as any;
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
      isVerified: false,
      maxScore: values.questions?.length || 0,
      questions: values.questions?.map((question) => {
        const typeId = parseInt(question.typeId);
        const result: CommunityQuizQuestionPayload = {
          id: {
            Int64: 0,
            Valid: false,
          },
          typeId: typeId,
          question: question.question,
          explainer: question.explainer,
          answers: question.answers,
        };

        if (typeId === TriviaQuestionTypeValues.Image) {
          result.imageUrl = question.imageUrl;
          result.imageAttributeName = question.imageAttributeName;
          result.imageAttributeUrl = question.imageAttributeUrl;
          result.imageWidth = question.imageWidth;
          result.imageHeight = question.imageHeight;
          result.imageAlt = question.imageAlt;
        } else if (typeId === TriviaQuestionTypeValues.Flag) {
          result.flagCode = question.flagCode;
        } else if (typeId === TriviaQuestionTypeValues.Map) {
          result.map = question.map;
          result.highlighted = question.highlighted;
        }

        return result;
      }),
    };

    await Promise.all(
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
        toast(
          genericToast(
            t.toasts.createCommunityQuizTitle,
            t.toasts.createCommunityQuizDescription,
            9000
          )
        );
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
    <CommunityQuizForm
      error={error}
      types={types}
      isLoading={isTypesLoading || isMapsLoading}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      images={images}
      isSearchingImages={isSearchingImages}
      isEmptyImageSearch={isEmptyImageSearch}
      onChangeSearchImage={handleChangeSearchImage}
      maps={maps}
    />
  );
};

export default CommunityQuizFormContainer;
