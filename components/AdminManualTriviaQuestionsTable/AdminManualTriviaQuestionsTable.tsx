import React, { FC, useState } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import TableCell from "../TableCell";
import { ManualQuestionsDto } from "../../types/manual-questions-dto";
import ArrowLeft from "../../Icons/ArrowLeft";
import ArrowRight from "../../Icons/ArrowRight";
import AdminManualTriviaQuestionsTablePlaceholder from "../../placeholders/AdminManualTriviaQuestionsTablePlaceholder";
import SolidPencil from "../../Icons/SolidPencil";
import AdminCreateManualTriviaQuestionForm from "../AdminCreateManualTriviaQuestionForm";
import Modal from "../Modal";
import { ManualTriviaQuestion } from "../../types/manual-trivia-question";

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
  onNextPage = (): void => {},
  onPreviousPage = (): void => {},
  onDeleteQuestion = (questionId: number): void => {},
}) => {
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  console.log(questionPage, "questionPage");
  console.log(selectedQuestion, "selectedQuestion");

  const handleEdit = (question: ManualTriviaQuestion) => {
    onOpen();
    setSelectedQuestion({
      typeId: 1,
      question: question.question,
      answerOneText: question.answers[0]?.text || "",
      answerOneFlagCode: question.answers[0]?.flagCode || "",
      answerTwoText: question.answers[1]?.text || "",
      answerTwoFlagCode: question.answers[1]?.flagCode || "",
      answerThreeText: question?.answers[2]?.text || "",
      answerThreeFlagCode: question?.answers[2]?.flagCode || "",
      answerFourText: question?.answers[3]?.text || "",
      answerFourFlagCode: question?.answers[3]?.flagCode || "",
      correctAnswer: question.answers.find((answer) => answer.isCorrect),
    });
  };

  return (
    <>
      <Flex
        margin={6}
        padding={12}
        background="white"
        borderRadius={12}
        justifyContent="center"
      >
        <Box overflow="auto" margin={6}>
          {isLoading ? (
            <AdminManualTriviaQuestionsTablePlaceholder />
          ) : (
            <Table size="md" variant="striped" colorscheme="gray">
              <Thead>
                <Tr>
                  <Th textAlign="left">{"QUESTION"} </Th>
                  <Th textAlign="left">{"TYPE"}</Th>
                  <Th textAlign="left">{"ANSWERS"}</Th>
                  <Th>{""}</Th>
                </Tr>
              </Thead>

              <Tbody>
                {questionPage?.questions.map((question, index) => (
                  <Tr key={index} fontWeight={600}>
                    <TableCell paddingY={3} paddingX={6}>
                      {question.question}
                    </TableCell>
                    <TableCell paddingY={3} paddingX={6}>
                      {question.type}
                    </TableCell>
                    <TableCell paddingY={3} paddingX={6}>
                      {question.answers.map((x) => x.text).join(", ")}
                    </TableCell>
                    <TableCell isNumeric paddingY={3} paddingX={6}>
                      <Flex alignItems="center">
                        <IconButton
                          variant="ghost"
                          aria-label="Edit question"
                          onClick={() => handleEdit(question)}
                          icon={
                            <SolidPencil
                              mt="4px"
                              ml="2.5px"
                              height="18px"
                              width="18px"
                            />
                          }
                          marginRight={2}
                        >
                          {"Edit"}
                        </IconButton>
                        <Button
                          colorScheme="red"
                          onClick={() => onDeleteQuestion(question.id)}
                        >
                          {"DELETE"}
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
        <Modal isOpen={isOpen} onClose={onClose} minWidth="660px">
          <Flex
            padding={10}
            maxHeight={{ base: "100%", md: "700px" }}
            width="100%"
            overflow="scroll"
          >
            <AdminCreateManualTriviaQuestionForm
              types={[
                { id: 1, name: "Text" },
                { id: 2, name: "Image" },
                { id: 3, name: "Flag" },
                { id: 4, name: "Map" },
              ]}
              editValues={selectedQuestion}
              isEditing
            />
          </Flex>
        </Modal>
      </Flex>
    </>
  );
};

export default AdminManualTriviaQuestionsTable;
