import React, { FC } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { CommunityQuiz } from "../../types/community-quiz-dto";
import Card from "../Card";
import UserProfileMyQuizzesTableContainer from "../../containers/UserProfileMyQuizzesTableContainer";

export interface Props {
  quizzes?: CommunityQuiz[];
  isCurrentUser?: boolean;
}

const UserProfileMyQuizzes: FC<Props> = ({
  quizzes = [],
  isCurrentUser = false,
}) => {
  const handleCreate = () => {
    console.log("create");
  };

  const getContent = () => {
    if (quizzes.length === 0) {
      return (
        <Alert borderRadius={6}>
          <AlertIcon />
          No entries to display.
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
        <Heading fontSize="26px">{"My Quizzes"}</Heading>
        {isCurrentUser && (
          <Button colorScheme="green" size="md" onClick={handleCreate}>
            {"Create Quiz"}
          </Button>
        )}
      </Flex>

      <Divider borderWidth={1} marginBottom={4} />
      <Box my={6}>{getContent()}</Box>
    </Card>
  );
};

export default UserProfileMyQuizzes;
