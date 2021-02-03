import React, { useState, useCallback } from "react";
import { Box, Input } from "@chakra-ui/core";
import { debounce } from "debounce";
import QuizListContainer from "../containers/QuizListContainer/QuizListContainer";

const Home = () => {
  const [filter, setFilter] = useState();

  const onChange = (value) => {
    setFilter(value);
  };

  const handleChange = (event) => {
    handleDebounceChange(event.target.value);
  };

  const handleDebounceChange = useCallback(debounce(onChange, 500), [onChange]);

  return (
    <Box width="100%">
      <Box width="50%" mx="auto" mt={10}>
        <Input onChange={handleChange} placeholder="Enter quiz name..." />
      </Box>
      <QuizListContainer filter={filter} />
    </Box>
  );
};

export default Home;
