import React, { FC } from "react";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import AdminQuizTablePlaceholder from "../../../placeholders/AdminQuizTablePlaceholder";
import { Quiz } from "../../../types/quiz";
import { QuizTypes } from "../../../types/quiz-types";
import TableCell from "../../Table/TableCell";

const getType = (typeId: number): string => {
  switch (typeId) {
    case QuizTypes.MAP:
      return "Map";
    case QuizTypes.FLAG:
      return "Flag";
    default:
      return "Unknown";
  }
};

export interface Props {
  quizzes?: Quiz[];
  isLoading?: boolean;
  onEdit?: (quiz: Quiz) => void;
  onDelete?: (quizId: number) => void;
}

export const AdminQuizTable: FC<Props> = ({
  quizzes = [],
  isLoading = false,
  onEdit = (): void => {},
  onDelete = () => {},
}) => {
  const getTable = (): JSX.Element => {
    if (quizzes.length === 0) {
      return (
        <Alert status="info" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          No quizzes to display.
        </Alert>
      );
    }

    return (
      <Table size="md" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th textAlign="left">{"NAME"} </Th>
            <Th textAlign="left">{"TYPE"} </Th>
            <Th textAlign="left">{"MAX SCORE"} </Th>
            <Th textAlign="left">{"TIME"} </Th>
            <Th>{""}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {quizzes.map((quiz, index) => (
            <Tr key={index} fontWeight={600}>
              <TableCell paddingY={3} paddingX={6}>
                {quiz.name}
              </TableCell>
              <TableCell paddingY={3} paddingX={6}>
                {getType(quiz.typeId)}
              </TableCell>
              <TableCell isNumeric paddingY={3} paddingX={6}>
                {quiz.maxScore}
              </TableCell>
              <TableCell paddingY={3} paddingX={6}>
                {quiz.time}
              </TableCell>
              <TableCell isNumeric paddingY={4} paddingX={6}>
                <Flex alignItems="center" justifyContent="flex-end">
                  <Button
                    colorScheme="black"
                    variant="link"
                    aria-label="Edit question"
                    onClick={() => onEdit(quiz)}
                    marginRight={4}
                  >
                    {"Edit"}
                  </Button>
                  <Button
                    colorScheme="red"
                    variant="link"
                    onClick={() => onDelete(quiz.id)}
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
    <Box overflow="auto" margin={6}>
      {isLoading ? <AdminQuizTablePlaceholder /> : getTable()}
    </Box>
  );
};
