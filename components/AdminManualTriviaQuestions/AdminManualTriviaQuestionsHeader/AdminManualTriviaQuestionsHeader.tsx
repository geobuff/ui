import React, { FC } from "react";
import { Heading, Flex, Button } from "@chakra-ui/react";

interface Props {
  onCreateQuestionClick?: () => void;
}

const AdminManualTriviaQuestionsHeader: FC<Props> = ({
  onCreateQuestionClick = (): void => {},
}) => (
  <Flex
    justifyContent="space-between"
    alignItems="center"
    marginBottom={5}
    marginX={2}
  >
    <Heading fontSize="24px">{"Manual Trivia Questions"}</Heading>

    <Button colorScheme="teal" size="md" onClick={onCreateQuestionClick}>
      {"Create Question"}
    </Button>
  </Flex>
);

export default AdminManualTriviaQuestionsHeader;
