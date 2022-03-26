import React, { FC } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

// export interface Props {}

const CommunityQuizQuestionsField: FC = () => {
  return (
    <Flex direction="column">
      <Text color="gray.400" fontWeight="medium" marginBottom={4}>
        {"No questions added"}
      </Text>
      <Button variant="outline" colorScheme="blue" maxWidth="200px">
        {"Add Question"}
      </Button>
    </Flex>
  );
};

export default CommunityQuizQuestionsField;
