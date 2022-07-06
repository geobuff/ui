import React, { FC, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import axiosClient from "../../axios/axiosClient";
import { editCommunityQuizToast } from "../../helpers/toasts";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";

import { CommunityQuizFormSubmit } from "../../types/community-quiz-form-submit";
import { CommunityQuizPayload } from "../../types/community-quiz-payload";
import useCommunityQuiz from "../../hooks/UseCommunityQuiz";
import { GetCommunityQuiz } from "../../types/get-community-quiz-dto";
import EditCommunityQuizForm from "../../components/EditCommunityQuizForm";
import { useSession } from "next-auth/react";
import { AuthUser } from "../../types/auth-user";
import axios from "axios";
import { UnsplashImage } from "../../types/unsplash-image";

interface Props {
  quizId: number;
}

const EditCommunityQuizFormContainer: FC<Props> = ({ quizId }) => {
  const { data: quiz, isLoading: isQuizLoading } = useCommunityQuiz(quizId);

  const {
    data: types,
    isLoading: isQuestionTypesLoading,
  } = useTriviaQuestionTypes();

  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const toast = useToast();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [images, setImages] = useState<UnsplashImage[]>();
  const [isSearchingImages, setIsSearchingImages] = useState(false);
  const [isEmptyImageSearch, setIsEmptyImageSearch] = useState(false);

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
          map: q.map,
          highlighted: q.highlighted,
          flagCode: q.flagCode,
          imageUrl: q.imageUrl,
          imageAttributeName: q.imageAttributeName,
          imageAttributeUrl: q.imageAttributeUrl,
          imageDownloadLocation: "",
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
      questions: values.questions?.map((question) => ({
        id: {
          Int64: question.id ?? 0,
          Valid: !!question.id,
        },
        typeId: parseInt(question.typeId),
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

    await axios.all(
      values.questions.map((x) =>
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
              url: x.urls.small,
              attributeName: x.user?.name,
              attributeUrl: `https://unsplash.com/@${x.user?.username}`,
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
