import React, { FC } from "react";
import { Button, Flex, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { CommunityQuizQuestion } from "../CommunityQuizQuestionsField/CommunityQuizQuestionsField";
import TableCell from "../../TableCell";

export interface Props {
  questions: CommunityQuizQuestion[];
  onDelete?: (question: CommunityQuizQuestion) => void;
}

const CommunityQuizQuestionsTable: FC<Props> = ({
  questions = [],
  onDelete = () => {},
}) => {
  return (
    <Table size="md" variant="striped" colorscheme="gray" overflowX="scroll">
      <Thead>
        <Tr>
          <Th textAlign="left">{"NO"} </Th>
          <Th textAlign="left">{"QUESTION"} </Th>
          <Th textAlign="left">{"ANSWERS"}</Th>
          <Th textAlign="left">{"TYPE"}</Th>
          <Th textAlign="right">{"ACTIONS"}</Th>
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
              {question?.answers?.map((x) => x.text).join(", ") || ""}
            </TableCell>
            <TableCell paddingY={4} paddingX={6}>
              {/* TODO: fix up type */}
              {question?.type.toString()}
              {/* {question?.typeId.toString()} */}
            </TableCell>
            <TableCell isNumeric paddingY={4} paddingX={6}>
              <Flex alignItems="center" justifyContent="flex-end">
                <Button
                  colorScheme="black"
                  variant="link"
                  aria-label="Edit question"
                  // onClick={() => onEdit(question)}
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
