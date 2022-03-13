import React, { FC, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { DateTime } from "luxon";

import Card from "../Card";
import Modal from "../Modal";
import TableCell from "../TableCell";
import ArrowLeft from "../../Icons/ArrowLeft";
import ArrowRight from "../../Icons/ArrowRight";
import AdminManualTriviaQuestionsTablePlaceholder from "../../placeholders/AdminManualTriviaQuestionsTablePlaceholder";

import { ManualQuestionsDto } from "../../types/manual-questions-dto";
import { ManualTriviaQuestion } from "../../types/manual-trivia-question";
import AdminManualTriviaQuestionContainer from "../../containers/AdminManualTriviaQuestionContainer";
import { TriviaQuestionType } from "../../types/trivia-question-types";

const getTypeIDByName = (typeName: TriviaQuestionType) => {
  switch (true) {
    case typeName === "Image":
      return "2";
    case typeName === "Flag":
      return "3";
    case typeName === "Map":
      return "4";

    default:
      return "1";
  }
};

export interface Props {
  questionPage?: ManualQuestionsDto;
  isLoading?: boolean;
  page?: number;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
  onDeleteQuestion?: (questionId: number) => void;
}

const AdminManualTriviaQuestionsTable: FC<Props> = ({
  questionPage = null,
  isLoading = true,
  page = 0,
  onNextPage = () => {},
  onPreviousPage = () => {},
  onDeleteQuestion = () => {},
}) => {
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleCreate = () => {
    setSelectedQuestion(null);
    onOpen();
  };

  const handleEdit = (question: ManualTriviaQuestion) => {
    onOpen();

    setSelectedQuestion({
      id: question.id,
      typeId: getTypeIDByName(question.type as TriviaQuestionType),
      question: question.question,
      answerOneText: question.answers[0]?.text || "",
      answerOneFlagCode: question.answers[0]?.flagCode || "",
      answerTwoText: question.answers[1]?.text || "",
      answerTwoFlagCode: question.answers[1]?.flagCode || "",
      answerThreeText: question?.answers[2]?.text || "",
      answerThreeFlagCode: question?.answers[2]?.flagCode || "",
      answerFourText: question?.answers[3]?.text || "",
      answerFourFlagCode: question?.answers[3]?.flagCode || "",
      correctAnswer: question.answers.findIndex((a) => a.isCorrect) + 1,
      hasFlagAnswers: question.answers.find((a) => !!a.flagCode) || false,
      imageUrl: question?.imageUrl || "",
      flagCode: question?.flagCode || "",
      map: question?.map || "",
      highlighted: question?.highlighted || "",
      quizDate: question?.lastUsed.Valid ? question?.lastUsed.Time : "",
      answers: question?.answers || [],
    });
  };

  return (
    <>
      <Card marginY={10} padding={6}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginBottom={5}
          marginX={2}
        >
          <Heading fontSize="24px">{"Manual Trivia Questions"}</Heading>

          <Button colorScheme="teal" size="md" onClick={handleCreate}>
            {"Create Question"}
          </Button>
        </Flex>

        <Divider borderWidth={1} marginBottom={4} />

        <Box overflow="scroll" margin={2}>
          {isLoading ? (
            <AdminManualTriviaQuestionsTablePlaceholder />
          ) : (
            <Table size="md" variant="striped" colorscheme="gray">
              <Thead>
                <Tr>
                  <Th textAlign="left">{"QUESTION"} </Th>
                  <Th textAlign="left">{"TYPE"}</Th>
                  <Th textAlign="left">{"LAST USED"}</Th>
                  <Th textAlign="left">{"QUIZ DATE"}</Th>
                  <Th textAlign="left">{"ANSWERS"}</Th>
                  <Th>{""}</Th>
                </Tr>
              </Thead>

              <Tbody>
                {questionPage?.questions.map((question, index) => (
                  <Tr key={index} fontWeight={600}>
                    <TableCell paddingY={4} paddingX={6} minWidth="260px">
                      {question.question}
                    </TableCell>
                    <TableCell paddingY={4} paddingX={6}>
                      {question.type}
                    </TableCell>
                    <TableCell paddingY={4} paddingX={6}>
                      {question.lastUsed.Valid &&
                        DateTime.fromISO(question.lastUsed.Time).toLocaleString(
                          DateTime.DATE_LONG
                        )}
                    </TableCell>
                    <TableCell paddingY={4} paddingX={6}>
                      {question.quizDate.Valid &&
                        DateTime.fromISO(question.quizDate.Time).toLocaleString(
                          DateTime.DATE_LONG
                        )}
                    </TableCell>
                    <TableCell paddingY={4} paddingX={6} minWidth="300px">
                      {question.answers.map((x) => x.text).join(", ")}
                    </TableCell>
                    <TableCell isNumeric paddingY={4} paddingX={6}>
                      <Flex alignItems="center" justifyContent="flex-end">
                        <Button
                          colorScheme="black"
                          variant="link"
                          aria-label="Edit question"
                          onClick={() => handleEdit(question)}
                          marginRight={4}
                        >
                          {"Edit"}
                        </Button>
                        <Button
                          colorScheme="red"
                          variant="link"
                          onClick={() => onDeleteQuestion(question.id)}
                        >
                          {"Delete"}
                        </Button>
                      </Flex>
                    </TableCell>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
          <Flex marginTop="auto" py={4}>
            <Box marginLeft="auto">
              <Button
                backgroundColor="#F3F3F3"
                isDisabled={isLoading || page === 0}
                marginRight={{ base: 2, sm: 3 }}
                onClick={onPreviousPage}
                height="48px"
                width={{ base: "46px", md: "132px" }}
                _hover={{ backgroundColor: "#e6e6e6" }}
              >
                <ArrowLeft
                  marginRight={{ base: 0, md: "6px" }}
                  height="20px"
                  width="20px"
                />
                {shouldRenderOnMobile && "Previous"}
              </Button>

              <Button
                role="group"
                backgroundColor="#F3F3F3"
                onClick={onNextPage}
                isDisabled={isLoading || !questionPage?.hasMore}
                height="48px"
                width={{ base: "46px", md: "132px" }}
                _hover={{ backgroundColor: "#e6e6e6" }}
              >
                {shouldRenderOnMobile && "Next"}
                <ArrowRight
                  marginLeft={{ base: 0, md: "6px" }}
                  height="20px"
                  width="20px"
                />
              </Button>
            </Box>
          </Flex>
        </Box>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          maxHeight={{ base: "100%", md: "700px" }}
          minWidth="660px"
        >
          <Flex padding={10} width="100%" overflow="scroll">
            <AdminManualTriviaQuestionContainer
              editValues={selectedQuestion}
              onClose={onClose}
            />
          </Flex>
        </Modal>
      </Card>
    </>
  );
};

export default AdminManualTriviaQuestionsTable;
