import React, { FC } from "react";

import { Flex } from "@chakra-ui/react";
import { FormikHelpers } from "formik";

import { GetMapsDto } from "../../types/get-maps-dto";
import { ManualTriviaQuestionEditValues } from "../../types/manual-trivia-question-edit-values";
import { ManualTriviaQuestionFormSubmit } from "../../types/manual-trivia-question-form-submit";
import { QuizType } from "../../types/quiz-type";
import { TriviaQuestionCategory } from "../../types/trivia-question-category";
import { UnsplashImage } from "../../types/unsplash-image";
import AdminManualTriviaQuestionForm from "../AdminManualTriviaQuestionForm";
import Modal from "../Modal";

export interface Props {
  editValues?: ManualTriviaQuestionEditValues;
  types?: QuizType[];
  categories?: TriviaQuestionCategory[];
  isOpen?: boolean;
  isSubmitting?: boolean;
  isLoading?: boolean;
  error?: string;
  onClose?: () => void;
  onSubmit?: (
    values: ManualTriviaQuestionEditValues,
    helpers: FormikHelpers<ManualTriviaQuestionFormSubmit>
  ) => void;
  images?: UnsplashImage[];
  isSearchingImages?: boolean;
  isEmptyImageSearch?: boolean;
  onChangeSearchImage?: (query: string) => void;
  maps?: GetMapsDto[];
}

const CreateEditTriviaQuestionModal: FC<Props> = ({
  editValues = null,
  types = [],
  categories = [],
  isOpen = false,
  isSubmitting = false,
  isLoading = false,
  error = "",
  onClose = (): void => {},
  onSubmit = (): void => {},
  images = [],
  isSearchingImages = false,
  isEmptyImageSearch = false,
  onChangeSearchImage = (): void => {},
  maps = [],
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    maxHeight={{ base: "100%", md: "700px" }}
    minWidth="660px"
  >
    <Flex padding={10} width="100%" overflow="scroll">
      <AdminManualTriviaQuestionForm
        editValues={editValues}
        types={types}
        categories={categories}
        isLoading={isLoading}
        isSubmitting={isSubmitting}
        error={error}
        onSubmit={onSubmit}
        onClose={onClose}
        images={images}
        isSearchingImages={isSearchingImages}
        isEmptyImageSearch={isEmptyImageSearch}
        onChangeSearchImage={onChangeSearchImage}
        maps={maps}
      />
    </Flex>
  </Modal>
);

export default CreateEditTriviaQuestionModal;
