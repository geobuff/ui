import React, { FC, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

// TODO: inherit from a common shape
export interface CommunityQuizAnswer {
  text: string;
  isCorrect: boolean;
  flagCode: string;
}

export interface CommunityQuizQuestion {
  type: string;
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
}

const CommunityQuizQuestionsField: FC<Props> = ({
  questions = [],
  onAddQuestion = () => {},
}) => {
  return (
    <Flex direction="column">
      {!questions.length ? (
        <Text color="gray.400" fontWeight="medium" marginBottom={4}>
          {"No questions added"}
        </Text>
      ) : (
        <Flex>{questions}</Flex>
      )}
      <Button
        variant="outline"
        colorScheme="blue"
        maxWidth="200px"
        onClick={onAddQuestion}
      >
        {"Add Question"}
      </Button>
    </Flex>
  );
};

export default CommunityQuizQuestionsField;
