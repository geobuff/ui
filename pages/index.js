import React, { useState, useCallback } from "react";
import { debounce } from "debounce";

import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

import MainView from "../components/MainView";
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

  const handleDebounceChange = useCallback(debounce(onChange, 500), [onChange]);

  const handleChange = (event) => {
    handleDebounceChange(event.target.value);
  };

  return (
    <MainView>
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
              marginLeft="14px"
              height="24px"
              width="24px"
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
    </MainView>
  );
};

export default Home;
