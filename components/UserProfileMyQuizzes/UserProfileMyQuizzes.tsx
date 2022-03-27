import React, { FC } from "react";
import { Alert, AlertIcon, Box, Heading } from "@chakra-ui/react";
import { CommunityQuiz } from "../../types/community-quiz-dto";
import Card from "../Card";
import UserProfileMyQuizzesTable from "./UserProfileMyQuizzesTable";

export interface Props {
  quizzes?: CommunityQuiz[];
  isCurrentUser?: boolean;
  error?: boolean;
}

const UserProfileMyQuizzes: FC<Props> = ({
  quizzes = [],
  isCurrentUser = false,
  error = false,
}) => {
  const getContent = () => {
    if (error) {
      return (
        <Alert borderRadius={6} status="error">
          <AlertIcon />
          Error fetching user quizzes. Please refresh page and try again.
        </Alert>
      );
    }

    if (quizzes.length === 0) {
      return (
        <Alert borderRadius={6}>
          <AlertIcon />
          No entries to display.
        </Alert>
      );
    }

    return (
      <UserProfileMyQuizzesTable
        quizzes={quizzes}
        isCurrentUser={isCurrentUser}
      />
    );
  };

  return (
    <Card paddingX={{ base: 4, md: 6 }} paddingY={{ base: 5, md: 6 }}>
      <Heading fontSize="26px" textAlign="left" marginLeft={2} marginBottom={8}>
        {"My Quizzes"}
      </Heading>
      <Box my={6}>{getContent()}</Box>
    </Card>
  );
};

export default UserProfileMyQuizzes;
