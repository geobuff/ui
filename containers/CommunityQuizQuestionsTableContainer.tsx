import React, { FC, useContext } from "react";

import { Table, TableCellEntry } from "@geobuff/buff-ui/components";

import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { LanguageContext } from "../contexts/LanguageContext";

import { getType } from "../helpers/trivia-types";
import { CommunityQuizFormQuestion } from "../types/community-quiz-form-submit";

interface Props {
  questions: CommunityQuizFormQuestion[];
  onEdit?: (question: CommunityQuizFormQuestion) => void;
  onDelete?: (question: CommunityQuizFormQuestion) => void;
}

export const CommunityQuizQuestionsTableContainer: FC<Props> = ({
  questions = [],
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const { t } = useContext(LanguageContext);

  const getRows = (): TableCellEntry[][] => {
    return questions.map((question, index) => [
      { node: index + 1 },
      { node: question.question },
      {
        node: (
          <>
            {question.answers?.map((answer, index) => (
              <Text
                as="span"
                key={index}
                color={answer.isCorrect && "green.600"}
              >
                {answer.text}
                {index + 1 !== question.answers.length && ", "}
              </Text>
            ))}
          </>
        ),
      },
      { node: getType(question?.typeId) },
      {
        node: (
          <Flex alignItems="center" justifyContent="flex-end">
            <Button
              colorScheme="black"
              variant="link"
              aria-label={t.communityQuizQuestionsTable.editAriaLabel}
              onClick={() => onEdit(question)}
              marginRight={4}
            >
              {t.global.edit}
            </Button>
            <Button
              colorScheme="red"
              variant="link"
              onClick={() => onDelete(question)}
            >
              {t.global.delete}
            </Button>
          </Flex>
        ),
        isNumeric: true,
      },
    ]);
  };

  return (
    <Box overflowX="scroll" width="100%" mb={3}>
      <Table
        headers={[
          { node: t.global.no },
          { node: t.global.question },
          { node: t.global.answers },
          { node: t.global.type },
          { node: t.global.actions },
        ]}
        rows={getRows()}
        noEntriesMessage={t.global.noEntriesMessage}
        columnCount={5}
      />
    </Box>
  );
};
