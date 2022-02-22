import React, { FC } from "react";
import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import TableCell from "../TableCell";
import { ManualQuestionsDto } from "../../types/manual-questions-dto";
import ArrowLeft from "../../Icons/ArrowLeft";
import ArrowRight from "../../Icons/ArrowRight";
import AdminManualTriviaQuestionsTablePlaceholder from "../../placeholders/AdminManualTriviaQuestionsTablePlaceholder";

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

  return (
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
                    <Button
                      colorScheme="red"
                      onClick={() => onDeleteQuestion(question.id)}
                    >
                      DELETE
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
    </Flex>
  );
};

export default AdminManualTriviaQuestionsTable;
