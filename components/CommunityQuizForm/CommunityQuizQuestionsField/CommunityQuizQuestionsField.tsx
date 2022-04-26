import React, { FC } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import CommunityQuizQuestionsTable from "../CommunityQuizQuestionsTable";
import { CommunityQuizFormQuestion } from "../../../types/community-quiz-form-submit";

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
  return (
    <Flex direction="column" width="100%">
      {!questions.length ? (
        <Flex justifyContent="center">
          <Text color="gray.400" fontWeight="medium" marginBottom={4}>
            {"No questions added"}
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
          {"Add Question"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default CommunityQuizQuestionsField;
