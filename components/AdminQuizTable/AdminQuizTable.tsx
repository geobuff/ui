import React, { FC, useState } from "react";
import {
  Alert,
  AlertIcon,
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
import { Quiz } from "../../types/quiz";
import AdminQuizFormContainer from "../../containers/AdminQuizFormContainer";
import { QuizEditValues } from "../../types/quiz-edit-values";

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
  page?: number;
  isLoading?: boolean;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  onDeleteQuiz?: (quizId: number) => void;
}

const AdminQuizTable: FC<Props> = ({
  quizPage = null,
  page = 0,
  isLoading = false,
  onPreviousPage = () => {},
  onNextPage = () => {},
  onDeleteQuiz = () => {},
}) => {
  const shouldRenderOnMobile = useBreakpointValue({ base: false, md: true });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedQuiz, setSelectedQuiz] = useState<QuizEditValues>(null);

  const handleCreate = () => {
    setSelectedQuiz(null);
    onOpen();
  };

  const handleEdit = (quiz: Quiz) => {
    setSelectedQuiz({
      id: quiz.id,
      typeId: quiz.typeId.toString(),
      badgeId: quiz.badgeId.Valid ? quiz.badgeId.Int64.toString() : "",
      continentId: quiz.continentId.Valid
        ? quiz.continentId.Int64.toString()
        : "",
      country: quiz.country || "",
      singular: quiz.singular,
      name: quiz.name,
      maxScore: quiz.maxScore.toString(),
      time: quiz.time.toString(),
      mapSVG: quiz.mapSVG || "",
      imageUrl: quiz.imageUrl,
      plural: quiz.plural,
      apiPath: quiz.apiPath,
      route: quiz.route,
      hasLeaderboard: quiz.hasLeaderboard.toString(),
      hasGrouping: quiz.hasGrouping.toString(),
      hasFlags: quiz.hasFlags.toString(),
      enabled: quiz.enabled.toString(),
    });

    onOpen();
  };

  const getTable = (): JSX.Element => {
    if (quizPage?.quizzes.length === 0) {
      return (
        <Alert status="info" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          No quizzes to display.
        </Alert>
      );
    }

    return (
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
              <TableCell isNumeric paddingY={4} paddingX={6}>
                <Flex alignItems="center" justifyContent="flex-end">
                  <Button
                    colorScheme="black"
                    variant="link"
                    aria-label="Edit question"
                    onClick={() => handleEdit(quiz)}
                    marginRight={4}
                  >
                    {"Edit"}
                  </Button>
                  <Button
                    colorScheme="red"
                    variant="link"
                    onClick={() => onDeleteQuiz(quiz.id)}
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
          <Button colorScheme="teal" size="md" onClick={handleCreate}>
            {"Create Quiz"}
          </Button>
        </Flex>

        <Divider borderWidth={1} marginBottom={4} />

        <Box overflow="auto" margin={6}>
          {isLoading ? <AdminQuizTablePlaceholder /> : getTable()}
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
          <AdminQuizFormContainer editValues={selectedQuiz} onClose={onClose} />
        </Flex>
      </Modal>
    </>
  );
};

export default AdminQuizTable;
