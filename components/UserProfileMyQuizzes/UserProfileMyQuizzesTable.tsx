import React, { FC } from "react";
import { DateTime } from "luxon";
import {
  Box,
  Button,
  Flex,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { CommunityQuiz } from "../../types/community-quiz-dto";

export interface Props {
  quizzes?: CommunityQuiz[];
  isCurrentUser?: boolean;
  onDeleteQuiz?: (quizId: number) => void;
}

const UserProfileMyQuizzesTable: FC<Props> = ({
  quizzes = [],
  isCurrentUser = false,
  onDeleteQuiz = (): void => {},
}) => {
  const handleEdit = (quiz: CommunityQuiz) => {
    console.log(quiz);
  };

  return (
    <Box overflow="auto">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Questions</Th>
            <Th>Plays</Th>
            <Th>Added</Th>
            {isCurrentUser && <Th>Actions</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {quizzes.map((quiz) => (
            <Tr key={quiz.id}>
              <Td>{quiz.name}</Td>
              <Td>{quiz.maxScore}</Td>
              <Td>{0}</Td>
              <Td>
                {DateTime.fromISO(quiz.added).toLocaleString(DateTime.DATE_MED)}
              </Td>
              <Td>
                <Flex alignItems="center" justifyContent="flex-end">
                  <Button
                    colorScheme="black"
                    variant="link"
                    aria-label="Edit question"
                    onClick={() => handleEdit(quiz)}
                    marginRight={4}
                  >
                    {"Edit"}
                  </Button>
                  <Button
                    colorScheme="red"
                    variant="link"
                    onClick={() => onDeleteQuiz(quiz.id)}
                  >
                    {"Delete"}
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UserProfileMyQuizzesTable;
