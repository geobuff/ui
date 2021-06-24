import React from "react";
import PropTypes from "prop-types";

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
  onChangeSearchUsers,
  onChangeQuiz,
  onChangeRange,
}) => {
  return (
    <Flex
      my={5}
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
          maxWidth={{ base: "100%", sm: "48.5%", md: "235px" }}
          borderColor="transparent"
          fontWeight="bold"
          background="#FFFFFF"
          onChange={onChangeQuiz}
          value={quizId}
          marginRight={{ base: 0, sm: 4, md: 3 }}
          marginBottom={2}
          isTruncated
        >
          {quizzes.map((quiz) => (
            <option key={quiz.id} value={quiz.id}>
              {quiz.name}
            </option>
          ))}
        </Select>
        <Select
          maxWidth={{ base: "100%", sm: "48.5%", md: "235px" }}
          borderColor="transparent"
          background="#FFFFFF"
          fontWeight="bold"
          onChange={onChangeRange}
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
            borderRadius={6}
            height="40px"
            marginLeft="auto"
            paddingLeft="46px"
            placeholder="Search users..."
            onChange={onChangeSearchUsers}
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
  onChangeQuiz: PropTypes.func,
  onChangeRange: PropTypes.func,
  onChangeSearchUsers: PropTypes.func,
};
LeaderboardFilters.defaultProps = {
  quizId: 1,
  quizzes: [],
  onChangeQuiz: () => {},
  onChangeRange: () => {},
  onChangeSearchUsers: () => {},
};

export default LeaderboardFilters;
