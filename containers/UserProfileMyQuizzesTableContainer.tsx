import React, { FC, useContext } from "react";

import {
  Table,
  TableCellEntry,
  TableHeadEntry,
} from "@geobuff/buff-ui/components";

import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useRouter } from "next/router";

import { LanguageContext } from "../contexts/LanguageContext";

import { CommunityQuiz } from "../types/community-quiz-dto";

interface Props {
  quizzes?: CommunityQuiz[];
  isLoading?: boolean;
  isCurrentUser?: boolean;
  onDeleteQuiz?: (quizId: number) => void;
  onCopyLink?: (quizId: number, name: string) => void;
}

export const UserProfileMyQuizzesTableContainer: FC<Props> = ({
  quizzes = [],
  isLoading = false,
  isCurrentUser = false,
  onDeleteQuiz = (): void => {},
  onCopyLink = (): void => {},
}) => {
  const router = useRouter();
  const { t } = useContext(LanguageContext);

  const getHeaders = (): TableHeadEntry[] => {
    const headers: TableHeadEntry[] = [
      { node: t.global.name },
      { node: t.global.questions },
      { node: t.global.plays },
      { node: t.global.added },
    ];

    if (isCurrentUser) {
      headers.push(
        { node: t.global.visibility },
        { node: t.global.status },
        { node: t.global.actions }
      );
    }

    return headers;
  };

  const getRows = (): TableCellEntry[][] => {
    return quizzes.map((quiz) => {
      const result = [
        { node: <Link href={`/community-quiz/${quiz.id}`}>{quiz.name}</Link> },
        { node: quiz.maxScore },
        { node: quiz.plays.Valid ? quiz.plays.Int64 : 0 },
        {
          node: DateTime.fromISO(quiz.added).toLocaleString(DateTime.DATE_MED),
        },
      ];

      if (isCurrentUser) {
        result.push(
          { node: quiz.isPublic ? t.global.public : t.global.private },
          { node: quiz.status },
          {
            node: (
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
                  onClick={() => router.push(`/community-quiz/edit/${quiz.id}`)}
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
            ),
          }
        );
      }

      return result;
    });
  };

  return (
    <Box overflow="auto">
      <Table
        columnCount={isCurrentUser ? 7 : 4}
        headers={getHeaders()}
        rows={getRows()}
        isLoading={isLoading}
        noEntriesMessage={t.global.noEntriesAlert}
      />
    </Box>
  );
};
