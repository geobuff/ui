import React, { FC } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Quiz } from "../../types/quiz";
import TableCell from "../TableCell";

export interface Props {
  quizzes?: Quiz[];
  isSubmitting?: boolean;
  error?: boolean;
  onToggleEnabled?: (quizId: number) => void;
}

const AdminQuizTable: FC<Props> = ({
  quizzes = [],
  isSubmitting = false,
  error = false,
  onToggleEnabled = (quizId: number): void => {},
}) => {
  return (
    <Flex
      margin={6}
      background="white"
      borderRadius={12}
      justifyContent="center"
    >
      {error && (
        <Alert status="error" borderRadius={6}>
          <AlertIcon />
          {`Error toggling enabled on quiz. Please refresh and try again.`}
        </Alert>
      )}
      <Box overflow="auto" margin={6}>
        <Table size="md" variant="striped" colorscheme="gray">
          <Thead>
            <Tr>
              <Th textAlign="left">{"NAME"} </Th>
              <Th>{""}</Th>
            </Tr>
          </Thead>

          <Tbody>
            {quizzes?.map((quiz, index) => (
              <Tr key={index} fontWeight={600}>
                <TableCell paddingY={3} paddingX={6}>
                  {quiz.name}
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
      </Box>
    </Flex>
  );
};

export default AdminQuizTable;
