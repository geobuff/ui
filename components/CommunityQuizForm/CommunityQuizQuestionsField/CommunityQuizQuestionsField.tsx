import React, { FC, useContext } from "react";

import { Button, Flex, Text } from "@chakra-ui/react";

import { LanguageContext } from "../../../contexts/LanguageContext";

import { CommunityQuizFormQuestion } from "../../../types/community-quiz-form-submit";
import CommunityQuizQuestionsTable from "../CommunityQuizQuestionsTable";

export interface Props {
  questions: CommunityQuizFormQuestion[];
  onAddQuestion?: () => void;
  onDeleteQuestion?: (question: CommunityQuizFormQuestion) => void;
  onEditQuestion?: (question: CommunityQuizFormQuestion) => void;
}

const CommunityQuizQuestionsField: FC<Props> = ({
  questions = [],
  onAddQuestion = () => {},
  onDeleteQuestion = () => {},
  onEditQuestion = () => {},
}) => {
  const { t } = useContext(LanguageContext);

  return (
    <Flex direction="column" width="100%">
      {!questions.length ? (
        <Flex justifyContent="center">
          <Text color="gray.400" fontWeight="medium" marginBottom={4}>
            {t.communityQuizQuestionsField.noQuestionsAdded}
          </Text>
        </Flex>
      ) : (
        <Flex overflowX="auto">
          <CommunityQuizQuestionsTable
            questions={questions}
            onDelete={onDeleteQuestion}
            onEdit={onEditQuestion}
          />
        </Flex>
      )}
      <Flex justifyContent="center" marginY={4}>
        <Button
          variant="outline"
          colorScheme="blue"
          maxWidth="200px"
          onClick={onAddQuestion}
        >
          {t.global.addQuestion}
        </Button>
      </Flex>
    </Flex>
  );
};

export default CommunityQuizQuestionsField;
