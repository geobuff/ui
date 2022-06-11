import { Flex } from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import React, { FC } from "react";
import { ManualTriviaQuestionEditValues } from "../../types/manual-trivia-question-edit-values";
import { ManualTriviaQuestionFormSubmit } from "../../types/manual-trivia-question-form-submit";
import { QuizType } from "../../types/quiz-type";
import { TriviaQuestionCategory } from "../../types/trivia-question-category";
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
      />
    </Flex>
  </Modal>
);

export default CreateEditTriviaQuestionModal;
