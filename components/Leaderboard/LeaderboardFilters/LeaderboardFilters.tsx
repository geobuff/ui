import React, { ChangeEvent, FC, useContext, useState } from "react";

import { Search, SolidCloseCircle } from "@geobuff/buff-ui/components";

import {
  Fade,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { debounce } from "throttle-debounce";

import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";

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
  onChangeQuiz = () => {},
  onChangeRange = () => {},
  onChangeSearchUsers = () => {},
  onChangeSearchRank = () => {},
}) => {
  const { t } = useContext(LanguageContext);

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

  const handleClearSearchRank = (): void => {
    setRankValue("");
    onChangeSearchRank(null);
  };

  return (
    <Flex
      marginBottom={{ base: 3, md: 1 }}
      justifyContent="space-between"
      flexWrap="wrap"
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
          noOfLines={1}
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
            placeholder={t.leaderboardFilters.searchUsersPlaceholder}
            onChange={handleSearchUsersDebounced}
            isDisabled={isLoading}
            _disabled={{ backgroundColor: "transparent", opacity: 0.4 }}
            _placeholder={{ color: "gray.500" }}
            _hover={{ border: "1px solid #CBD5E0" }}
          />
        </InputGroup>
        <InputGroup>
          <Input
            type="number"
            value={rankValue}
            background="#FFFFFF"
            boxShadow="0px 3px 4px rgba(226, 227, 227, 0.5)"
            borderRadius={8}
            height="42px"
            marginLeft={3}
            placeholder={t.leaderboardFilters.searchRankPlaceholder}
            onChange={handleChangeSearchRank}
            isDisabled={isLoading}
            _disabled={{ backgroundColor: "transparent", opacity: 0.4 }}
            _placeholder={{ color: "gray.500" }}
            _hover={{ border: "1px solid #CBD5E0" }}
          />
          <InputRightElement>
            <Fade in={rankValue?.length > 0}>
              <IconButton
                aria-label="close circle"
                position="absolute"
                top="11px"
                right={3}
                maxHeight="22px"
                minWidth="22px"
                backgroundColor="transparent"
                borderRadius={25}
                isDisabled={isLoading}
                color="#a6a6a6"
                fontWeight="bold"
                _hover={{ backgroundColor: "transparent", color: "#5c5c5c" }}
                onClick={handleClearSearchRank}
              >
                <SolidCloseCircle height={5} width={5} padding={0} />
              </IconButton>
            </Fade>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
};

export default LeaderboardFilters;
