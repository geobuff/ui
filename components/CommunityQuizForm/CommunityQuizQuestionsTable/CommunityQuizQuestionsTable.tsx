import React, { FC, useContext } from "react";

import {
  Button,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { LanguageContext } from "../../../contexts/LanguageContext";

import { getType } from "../../../helpers/trivia-types";
import { CommunityQuizFormQuestion } from "../../../types/community-quiz-form-submit";
import TableCell from "../../Table/TableCell";

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
  const { t } = useContext(LanguageContext);

  return (
    <Table size="md" variant="striped" colorScheme="gray" overflowX="scroll">
      <Thead>
        <Tr>
          <Th textAlign="left">{t.global.no} </Th>
          <Th textAlign="left">{t.global.question} </Th>
          <Th textAlign="left">{t.global.answers}</Th>
          <Th textAlign="left">{t.global.type}</Th>
          <Th textAlign="left">{t.global.actions}</Th>
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
                  aria-label={t.communityQuizQuestionsTable.editAriaLabel}
                  onClick={() => onEdit(question)}
                  marginRight={4}
                >
                  {t.global.edit}
                </Button>
                <Button
                  colorScheme="red"
                  variant="link"
                  onClick={() => onDelete(question)}
                >
                  {t.global.delete}
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
