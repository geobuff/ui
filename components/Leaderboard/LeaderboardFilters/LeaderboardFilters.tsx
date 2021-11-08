import React, { ChangeEvent, FC, useState } from "react";
import { debounce } from "throttle-debounce";

import {
  Select,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import Search from "../../../Icons/Search";
import { Quiz } from "../../../types/quiz";

enum RangeFilters {
  All = "All Time",
  Week = "This Week",
  Today = "Today",
}

interface Props {
  quizId?: string;
  quizzes?: Quiz[];
  isLoading?: boolean;
  rank?: string;
  onChangeQuiz?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeRange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeSearchUsers?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeSearchRank?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const LeaderboardFilters: FC<Props> = ({
  quizzes = [],
  quizId = "1",
  isLoading = false,
  rank = "",
  onChangeQuiz = (event: ChangeEvent<HTMLSelectElement>): void => {},
  onChangeRange = (event: ChangeEvent<HTMLSelectElement>): void => {},
  onChangeSearchUsers = (event: ChangeEvent<HTMLInputElement>): void => {},
  onChangeSearchRank = (event: ChangeEvent<HTMLInputElement>): void => {},
}) => {
  const [rankValue, setRankValue] = useState(rank);

  const handleChangeSearchRankDebounced = debounce(500, (event) => {
    onChangeSearchRank(event);
  });

  const handleSearchUsersDebounced = debounce(250, (event) =>
    onChangeSearchUsers(event)
  );

  const handleChangeSearchRank = (event): void => {
    setRankValue(event.target.value);
    handleChangeSearchRankDebounced(event);
  };

  return (
    <Flex
      marginBottom={{ base: 3, md: 1 }}
      justifyContent="space-between"
      flexWrap="wrap"
      paddingX={{ base: 2.5, sm: 0, md: 0 }}
    >
      <Flex
        flexGrow={4}
        marginBottom={2}
        flexWrap="wrap"
        width={{ base: "100%", md: "inherit" }}
      >
        <Select
          maxWidth={{ base: "100%", sm: "100%", md: "235px" }}
          borderColor="transparent"
          boxShadow="0px 3px 4px rgba(226, 227, 227, 0.5)"
          height="42px"
          borderRadius={8}
          fontWeight="bold"
          background="#FFFFFF"
          onChange={onChangeQuiz}
          value={quizId}
          marginRight={{ base: 0, sm: 0, md: 3 }}
          marginBottom={2}
          isTruncated
          isDisabled={isLoading}
        >
          {quizzes.map((quiz) => (
            <option key={quiz.id} value={quiz.id}>
              {quiz.name}
            </option>
          ))}
        </Select>
        <Select
          maxWidth={{ base: "100%", sm: "100%", md: "235px" }}
          boxShadow="0px 3px 4px rgba(226, 227, 227, 0.5)"
          height="42px"
          borderColor="transparent"
          background="#FFFFFF"
          borderRadius={8}
          fontWeight="bold"
          onChange={onChangeRange}
          isDisabled={isLoading}
        >
          <option value={null}>{RangeFilters.All}</option>
          <option value="week">{RangeFilters.Week}</option>
          <option value="day">{RangeFilters.Today}</option>
        </Select>
      </Flex>

      <Flex
        marginLeft={{ base: 0, md: 2 }}
        width={{ base: "100%", sm: "100%", md: "400px" }}
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search
              marginTop="6px"
              marginLeft="12px"
              height="24px"
              width="24px"
              color="gray.500"
            />
          </InputLeftElement>
          <Input
            background="#FFFFFF"
            boxShadow="0px 3px 4px rgba(226, 227, 227, 0.5)"
            borderRadius={8}
            height="42px"
            marginLeft="auto"
            paddingLeft="46px"
            placeholder="Search users..."
            onChange={handleSearchUsersDebounced}
            isDisabled={isLoading}
            _disabled={{ backgroundColor: "transparent", opacity: 0.4 }}
            _placeholder={{ color: "gray.500" }}
            _hover={{ border: "1px solid #CBD5E0" }}
          />
        </InputGroup>
        <Input
          type="number"
          value={rankValue}
          background="#FFFFFF"
          boxShadow="0px 3px 4px rgba(226, 227, 227, 0.5)"
          borderRadius={8}
          height="42px"
          marginLeft={3}
          placeholder="Enter rank..."
          onChange={handleChangeSearchRank}
          isDisabled={isLoading}
          _disabled={{ backgroundColor: "transparent", opacity: 0.4 }}
          _placeholder={{ color: "gray.500" }}
          _hover={{ border: "1px solid #CBD5E0" }}
        />
      </Flex>
    </Flex>
  );
};

export default LeaderboardFilters;
