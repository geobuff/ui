import React, { FC, useState } from "react";
import CommunityQuizForm from "../../components/CommunityQuizForm";
import useTriviaQuestionTypes from "../../hooks/UseTriviaQuestionTypes";

// export interface Props {}

const CommunityQuizFormContainer: FC = () => {
  // TODO: move to container
  const { data: types, isLoading } = useTriviaQuestionTypes();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (values: any): void => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log(values, "values");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <CommunityQuizForm
      types={types}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
};

export default CommunityQuizFormContainer;
