import React, { FC, useContext } from "react";

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
import { DateTime } from "luxon";
import { useRouter } from "next/router";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import { CommunityQuiz } from "../../types/community-quiz-dto";

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
  const { t } = useContext(LanguageContext);

  return (
    <Box overflow="auto">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>{t.global.name}</Th>
            <Th>{t.global.questions}</Th>
            <Th>{t.global.plays}</Th>
            <Th>{t.global.added}</Th>
            {isCurrentUser && (
              <>
                <Th>{t.global.visibility}</Th>
                <Th>{t.global.status}</Th>
                <Th>{t.global.actions}</Th>
              </>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {quizzes.map((quiz) => (
            <Tr key={quiz.id}>
              <Td>
                <Link href={`/community-quiz/${quiz.id}`}>{quiz.name}</Link>
              </Td>
              <Td>{quiz.maxScore}</Td>
              <Td>{quiz.plays.Valid ? quiz.plays.Int64 : 0}</Td>
              <Td>
                {DateTime.fromISO(quiz.added).toLocaleString(DateTime.DATE_MED)}
              </Td>
              {isCurrentUser && (
                <>
                  <Td>{quiz.isPublic ? t.global.public : t.global.private}</Td>
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
                          {t.global.copyLink}
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
                        {t.global.edit}
                      </Button>
                      <Button
                        colorScheme="red"
                        variant="link"
                        onClick={() => onDeleteQuiz(quiz.id)}
                      >
                        {t.global.delete}
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
