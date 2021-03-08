import React, { useState, useCallback } from "react";
import { debounce } from "debounce";

import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
} from "@chakra-ui/react";

import HeroBanner from "../components/HeroBanner";
import QuizListContainer from "../containers/QuizListContainer";

import Search from "../Icons/Search";

import useCurrentUser from "../hooks/UseCurrentUser";

const Home = () => {
  const [filter, setFilter] = useState();

  const { user } = useCurrentUser();

  const onChange = (value) => {
    setFilter(value);
  };

  const handleChange = (event) => {
    handleDebounceChange(event.target.value);
  };

  const handleDebounceChange = useCallback(debounce(onChange, 500), [onChange]);

  return (
    <Flex width="100%" mx="auto" position="relative">
      <Box position="absolute" left="0" right="0" top="0">
        <HeroBanner username={user?.username} />
        <Box
          mx="auto"
          position="relative"
          left={0}
          right={0}
          bottom="21px"
          maxWidth={{
            base: "85%",
            sm: "80%",
            md: "60%",
            lg: "600px",
          }}
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search
                marginTop="8px"
                marginLeft="12px"
                height="26px"
                width="26px"
                color="gray.500"
              />
            </InputLeftElement>
            <Input
              paddingLeft="44px"
              width="100%"
              size="lg"
              onChange={handleChange}
              placeholder="Enter quiz name..."
            />
          </InputGroup>
        </Box>
        <QuizListContainer filter={filter} />
      </Box>
    </Flex>
  );
};

export default Home;
