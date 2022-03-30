import React, { FC } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import CommunityQuizQuestionsTable from "../CommunityQuizQuestionsTable";

// TODO: inherit from a common shape
export interface CommunityQuizAnswer {
  text: string;
  isCorrect: boolean;
  flagCode: string;
}

export interface CommunityQuizQuestion {
  typeId: string;
  imageUrl?: string;
  flagCode?: string;
  map?: string;
  highlighted?: string;
  question: string;
  answers: CommunityQuizAnswer[];
}

export interface Props {
  questions: CommunityQuizQuestion[];
  onAddQuestion?: () => void;
  onDeleteQuestion?: (question: CommunityQuizQuestion) => void;
}

const CommunityQuizQuestionsField: FC<Props> = ({
  questions = [],
  onAddQuestion = () => {},
  onDeleteQuestion = () => {},
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
        <CommunityQuizQuestionsTable
          questions={questions}
          onDelete={onDeleteQuestion}
        />
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
