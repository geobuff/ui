import React from "react";
import PropTypes from "prop-types";
import { debounce } from "throttle-debounce";

import {
  Select,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import Search from "../../Icons/Search";

const LeaderboardFilters = ({
  quizzes,
  quizId,
  isLoading,
  onChangeSearchUsers,
  onChangeQuiz,
  onChangeRange,
}) => {
  // const handleSearchUsers = (event) => {
  //   setInputValue(event.target.value);
  //   handleChangeDebounced(event);
  // };

  const handleSearchUsersDebounced = debounce(250, (event) =>
    onChangeSearchUsers(event)
  );

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
          <option value={null}>{"All Time"}</option>
          <option value="week">{"This Week"}</option>
          <option value="day">{"Today"}</option>
        </Select>
      </Flex>

      <Flex
        marginLeft={{ base: 0, md: 2 }}
        width={{ base: "100%", sm: "100%", md: "230px" }}
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
            _placeholder={{ color: "gray.500" }}
            _hover={{ border: "1px solid #CBD5E0" }}
          />
        </InputGroup>
      </Flex>
    </Flex>
  );
};

LeaderboardFilters.propTypes = {
  quizId: PropTypes.number,
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  isLoading: PropTypes.bool,
  onChangeQuiz: PropTypes.func,
  onChangeRange: PropTypes.func,
  onChangeSearchUsers: PropTypes.func,
};
LeaderboardFilters.defaultProps = {
  quizId: 1,
  quizzes: [],
  isLoading: false,
  onChangeQuiz: () => {},
  onChangeRange: () => {},
  onChangeSearchUsers: () => {},
};

export default LeaderboardFilters;
