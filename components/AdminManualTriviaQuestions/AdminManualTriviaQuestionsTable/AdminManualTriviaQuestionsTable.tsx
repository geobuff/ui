import React, { FC } from "react";

import { TableCell } from "@geobuff/buff-ui/components";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import AdminManualTriviaQuestionsTablePlaceholder from "../../../placeholders/AdminManualTriviaQuestionsTablePlaceholder";
import { ManualTriviaQuestion } from "../../../types/manual-trivia-question";

export interface Props {
  entries?: ManualTriviaQuestion[];
  isLoading?: boolean;
  onEditQuestionClick?: (question: ManualTriviaQuestion) => void;
  onDeleteQuestionClick?: (questionId: number) => void;
}

const AdminManualTriviaQuestionsTable: FC<Props> = ({
  entries = [],
  isLoading = true,
  onEditQuestionClick = (): void => {},
  onDeleteQuestionClick = () => {},
}) => {
  const getTable = (): JSX.Element => {
    if (entries.length === 0) {
      return (
        <Alert status="info" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          No questions to display.
        </Alert>
      );
    }

    return (
      <Table size="md" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th textAlign="left">{"QUESTION"} </Th>
            <Th textAlign="left">{"TYPE"}</Th>
            <Th textAlign="left">{"CATEGORY"}</Th>
            <Th textAlign="left">{"ANSWERS"}</Th>
            <Th>{""}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {entries.map((question, index) => (
            <Tr key={index} fontWeight={600}>
              <TableCell paddingY={4} paddingX={6} minWidth="260px">
                {question.question}
              </TableCell>
              <TableCell paddingY={4} paddingX={6}>
                {question.type}
              </TableCell>
              <TableCell paddingY={4} paddingX={6}>
                {question.category}
              </TableCell>
              <TableCell paddingY={4} paddingX={6} minWidth="300px">
                {question.answers.map((answer, index) => (
                  <Text
                    as="span"
                    key={answer.id}
                    color={answer.isCorrect && "green.600"}
                  >
                    {answer.text}
                    {index + 1 !== question.answers.length && ", "}
                  </Text>
                ))}
              </TableCell>
              <TableCell isNumeric paddingY={4} paddingX={6}>
                <Flex alignItems="center" justifyContent="flex-end">
                  <Button
                    colorScheme="black"
                    variant="link"
                    aria-label="Edit question"
                    onClick={() => onEditQuestionClick(question)}
                    marginRight={4}
                  >
                    {"Edit"}
                  </Button>
                  <Button
                    colorScheme="red"
                    variant="link"
                    onClick={() => onDeleteQuestionClick(question.id)}
                  >
                    {"Delete"}
                  </Button>
                </Flex>
              </TableCell>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  return (
    <Box overflow="scroll" margin={2}>
      {isLoading ? <AdminManualTriviaQuestionsTablePlaceholder /> : getTable()}
    </Box>
  );
};

export default AdminManualTriviaQuestionsTable;
