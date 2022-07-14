import React, { FC } from "react";
import {
  Button,
  Flex,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";

import TableCell from "../../TableCell";
import { getType } from "../../../helpers/trivia-types";
import { CommunityQuizFormQuestion } from "../../../types/community-quiz-form-submit";

export interface Props {
  questions: CommunityQuizFormQuestion[];
  onEdit?: (question: CommunityQuizFormQuestion) => void;
  onDelete?: (question: CommunityQuizFormQuestion) => void;
}

const CommunityQuizQuestionsTable: FC<Props> = ({
  questions = [],
  onEdit = () => {},
  onDelete = () => {},
}) => {
  return (
    <Table size="md" variant="striped" colorScheme="gray" overflowX="scroll">
      <Thead>
        <Tr>
          <Th textAlign="left">{"NO"} </Th>
          <Th textAlign="left">{"QUESTION"} </Th>
          <Th textAlign="left">{"ANSWERS"}</Th>
          <Th textAlign="left">{"TYPE"}</Th>
          <Th textAlign="left">{"ACTIONS"}</Th>
        </Tr>
      </Thead>

      <Tbody>
        {questions.map((question, index) => (
          <Tr key={index} fontWeight={600}>
            <TableCell paddingY={4} paddingX={6}>
              {index + 1}
            </TableCell>
            <TableCell paddingY={4} paddingX={6}>
              {question.question}
            </TableCell>

            <TableCell paddingY={4} paddingX={6}>
              {question.answers?.map((answer, index) => (
                <Text
                  as="span"
                  key={index}
                  color={answer.isCorrect && "green.600"}
                >
                  {answer.text}
                  {index + 1 !== question.answers.length && ", "}
                </Text>
              ))}
            </TableCell>
            <TableCell paddingY={4} paddingX={6}>
              {getType(question?.typeId)}
            </TableCell>
            <TableCell isNumeric paddingY={4} paddingX={6}>
              <Flex alignItems="center" justifyContent="flex-end">
                <Button
                  colorScheme="black"
                  variant="link"
                  aria-label="Edit question"
                  onClick={() => onEdit(question)}
                  marginRight={4}
                >
                  {"Edit"}
                </Button>
                <Button
                  colorScheme="red"
                  variant="link"
                  onClick={() => onDelete(question)}
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

export default CommunityQuizQuestionsTable;
