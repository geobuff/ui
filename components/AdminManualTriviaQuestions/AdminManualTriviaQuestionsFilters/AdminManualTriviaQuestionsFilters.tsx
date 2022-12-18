import React, { ChangeEvent, FC } from "react";

import { Search } from "@geobuff/buff-ui/components";

import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { debounce } from "throttle-debounce";

import { TriviaQuestionCategory } from "../../../types/trivia-question-category";
import { TriviaQuestionType } from "../../../types/trivia-question-type";

interface Props {
  typeId?: string;
  types?: TriviaQuestionType[];
  categories?: TriviaQuestionCategory[];
  categoryId?: string;
  isLoading?: boolean;
  onChangeType?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeCategory?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeSearchQuestion?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AdminManualTriviaQuestionsFilters: FC<Props> = ({
  typeId = "",
  types = [],
  categories = [],
  categoryId = "",
  isLoading = false,
  onChangeType = () => {},
  onChangeCategory = () => {},
  onChangeSearchQuestion = () => {},
}) => {
  const handleSearchQuestionDebounced = debounce(1000, (event) =>
    onChangeSearchQuestion(event)
  );

  return (
    <Flex
      marginBottom={{ base: 3, md: 1 }}
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Flex
        marginLeft={{ base: 0, md: 2 }}
        width={{ base: "100%", sm: "100%", md: "50%" }}
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
            placeholder="Search question..."
            onChange={handleSearchQuestionDebounced}
            isDisabled={isLoading}
            height="42px"
            size="lg"
            fontSize="16px"
            fontWeight={400}
            background="#F6F6F6"
            borderRadius={6}
            _placeholder={{ color: "gray.500" }}
            _hover={{ background: "#e0e0e0" }}
            boxShadow="0px 3px 4px rgba(226, 227, 227, 0.5)"
            _disabled={{ backgroundColor: "transparent", opacity: 0.4 }}
          />
        </InputGroup>
      </Flex>

      <Flex
        flexGrow={4}
        marginBottom={2}
        flexWrap="wrap"
        width={{ base: "100%", md: "inherit" }}
        justifyContent={{ base: "left", md: "right" }}
      >
        <Select
          maxWidth={{ base: "100%", sm: "100%", md: "235px" }}
          onChange={onChangeCategory}
          value={categoryId}
          boxShadow="0px 3px 4px rgba(226, 227, 227, 0.5)"
          height="42px"
          borderRadius={6}
          background="#F6F6F6"
          _hover={{ background: "#e0e0e0" }}
          fontWeight="bold"
          marginRight={{ base: 0, sm: 0, md: 3 }}
          noOfLines={1}
          isDisabled={isLoading}
        >
          <option value="">
            {isLoading ? "Loading categories..." : "Select a category..."}
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Select
          maxWidth={{ base: "100%", sm: "100%", md: "235px" }}
          onChange={onChangeType}
          value={typeId}
          boxShadow="0px 3px 4px rgba(226, 227, 227, 0.5)"
          height="42px"
          borderRadius={6}
          background="#F6F6F6"
          _hover={{ background: "#e0e0e0" }}
          fontWeight="bold"
          marginRight={{ base: 0, sm: 0, md: 3 }}
          noOfLines={1}
          isDisabled={isLoading}
        >
          <option value="">
            {isLoading ? "Loading types..." : "Select a type..."}
          </option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
};

export default AdminManualTriviaQuestionsFilters;
