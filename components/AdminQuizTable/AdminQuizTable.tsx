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

import TableCell from "../TableCell";
import { QuizTypes } from "../../types/quiz-types";
import ArrowLeft from "../../Icons/ArrowLeft";
import ArrowRight from "../../Icons/ArrowRight";
import { QuizPageDto } from "../../types/quiz-page-dto";
import AdminQuizTablePlaceholder from "../../placeholders/AdminQuizTablePlaceholder";
import Card from "../Card";
import Modal from "../Modal";
import AdminCreateQuizContainer from "../../containers/AdminCreateQuizContainer";

const getType = (typeId: number): string => {
  switch (typeId) {
    case QuizTypes.MAP:
      return "Map";
    case QuizTypes.FLAG:
      return "Flag";
    default:
      return "Unknown";
  }
};

export interface Props {
  quizPage?: QuizPageDto;
  isSubmitting?: boolean;
  page?: number;
  isLoading?: boolean;
  onToggleEnabled?: (quizId: number) => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

const AdminQuizTable: FC<Props> = ({
  quizPage = null,
  isSubmitting = false,
  page = 0,
  isLoading = false,
  onToggleEnabled = (quizId: number): void => {},
  onPreviousPage = () => {},
  onNextPage = () => {},
}) => {
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card marginY={10} padding={6}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginBottom={5}
          marginX={2}
        >
          <Heading fontSize="24px">{"Quizzes"}</Heading>
          <Button colorScheme="teal" size="md" onClick={onOpen}>
            {"Create Quiz"}
          </Button>
        </Flex>

        <Divider borderWidth={1} marginBottom={4} />

        <Box overflow="auto" margin={6}>
          {isLoading ? (
            <AdminQuizTablePlaceholder />
          ) : (
            <Table size="md" variant="striped" colorscheme="gray">
              <Thead>
                <Tr>
                  <Th textAlign="left">{"NAME"} </Th>
                  <Th textAlign="left">{"TYPE"} </Th>
                  <Th textAlign="left">{"MAX SCORE"} </Th>
                  <Th textAlign="left">{"TIME"} </Th>
                  <Th>{""}</Th>
                </Tr>
              </Thead>

              <Tbody>
                {quizPage?.quizzes.map((quiz, index) => (
                  <Tr key={index} fontWeight={600}>
                    <TableCell paddingY={3} paddingX={6}>
                      {quiz.name}
                    </TableCell>
                    <TableCell paddingY={3} paddingX={6}>
                      {getType(quiz.typeId)}
                    </TableCell>
                    <TableCell isNumeric paddingY={3} paddingX={6}>
                      {quiz.maxScore}
                    </TableCell>
                    <TableCell paddingY={3} paddingX={6}>
                      {quiz.time}
                    </TableCell>
                    <TableCell isNumeric paddingY={3} paddingX={6}>
                      <Button
                        colorScheme={quiz.enabled ? "blue" : "green"}
                        onClick={() => onToggleEnabled(quiz.id)}
                        disabled={isSubmitting}
                      >
                        {quiz.enabled ? "DISABLE" : "ENABLE"}
                      </Button>
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
                isDisabled={page === 0 || isLoading}
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
                isDisabled={isLoading || !quizPage.hasMore}
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
      </Card>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        maxHeight={{ base: "100%", md: "700px" }}
        minWidth="660px"
      >
        <Flex padding={10} width="100%" overflow="scroll">
          <AdminCreateQuizContainer onClose={onClose} />
        </Flex>
      </Modal>
    </>
  );
};

export default AdminQuizTable;
