import React, { FC, useContext } from "react";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { LanguageContext } from "../../contexts/LanguageContext";

import UserProfileMyQuizzesTableContainer from "../../containers/UserProfileMyQuizzesTableContainer";

import { CommunityQuiz } from "../../types/community-quiz-dto";
import Card from "../Card";

export interface Props {
  quizzes?: CommunityQuiz[];
  isCurrentUser?: boolean;
  username?: string;
  error?: boolean;
}

const UserProfileMyQuizzes: FC<Props> = ({
  quizzes = [],
  isCurrentUser = false,
  username,
  error = false,
}) => {
  const router = useRouter();
  const { t } = useContext(LanguageContext);

  const getContent = () => {
    if (error) {
      return (
        <Alert borderRadius={6} status="error">
          <AlertIcon />
          Error fetching user quizzes. Please refresh and try again.
        </Alert>
      );
    }

    if (quizzes.length === 0) {
      return (
        <Alert borderRadius={6}>
          <AlertIcon />
          {t.global.noEntriesAlert}
        </Alert>
      );
    }

    return (
      <UserProfileMyQuizzesTableContainer
        quizzes={quizzes}
        isCurrentUser={isCurrentUser}
      />
    );
  };

  return (
    <Card paddingX={{ base: 4, md: 6 }} paddingY={{ base: 5, md: 6 }}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        marginBottom={5}
        marginX={2}
      >
        <Heading fontSize="26px">
          {`${username && !isCurrentUser ? `${username}'s` : t.global.my} ${
            t.global.quizzes
          }`}
        </Heading>
        {isCurrentUser && (
          <Button
            colorScheme="green"
            size="md"
            onClick={() => router.push("/community-quiz/create")}
          >
            {t.global.createQuiz}
          </Button>
        )}
      </Flex>

      <Divider borderWidth={1} marginBottom={4} />
      <Box my={6}>{getContent()}</Box>
    </Card>
  );
};

export default UserProfileMyQuizzes;
