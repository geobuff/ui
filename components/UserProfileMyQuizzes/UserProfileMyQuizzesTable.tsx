import React, { FC } from "react";
import { DateTime } from "luxon";
import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { CommunityQuiz } from "../../types/community-quiz-dto";
import { useRouter } from "next/router";
import Link from "next/link";

export interface Props {
  quizzes?: CommunityQuiz[];
  isCurrentUser?: boolean;
  onDeleteQuiz?: (quizId: number) => void;
  onCopyLink?: (quizId: number, name: string) => void;
}

const UserProfileMyQuizzesTable: FC<Props> = ({
  quizzes = [],
  isCurrentUser = false,
  onDeleteQuiz = (): void => {},
  onCopyLink = (): void => {},
}) => {
  const router = useRouter();

  return (
    <Box overflow="auto">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Questions</Th>
            <Th>Plays</Th>
            <Th>Added</Th>
            {isCurrentUser && (
              <>
                <Th>Visibility</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {quizzes.map((quiz) => (
            <Tr key={quiz.id}>
              <Td>
                <Link href={`/community-quiz/${quiz.id}`}>
                  <ChakraLink>{quiz.name}</ChakraLink>
                </Link>
              </Td>
              <Td>{quiz.maxScore}</Td>
              <Td>{quiz.plays.Valid ? quiz.plays.Int64 : 0}</Td>
              <Td>
                {DateTime.fromISO(quiz.added).toLocaleString(DateTime.DATE_MED)}
              </Td>
              {isCurrentUser && (
                <>
                  <Td>{quiz.isPublic ? "Public" : "Private"}</Td>
                  <Td>{quiz.status}</Td>
                  <Td>
                    <Flex alignItems="center" justifyContent="flex-end">
                      {!quiz.isPublic && (
                        <Button
                          colorScheme="black"
                          variant="link"
                          aria-label="Copy link"
                          onClick={() => onCopyLink(quiz.id, quiz.name)}
                          marginRight={4}
                        >
                          {"Copy Link"}
                        </Button>
                      )}
                      <Button
                        colorScheme="black"
                        variant="link"
                        aria-label="Edit question"
                        onClick={() =>
                          router.push(`/community-quiz/edit/${quiz.id}`)
                        }
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
                </>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UserProfileMyQuizzesTable;
