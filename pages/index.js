import React, { useState } from "react";
import { Box } from "@chakra-ui/core";
import { DebounceInput } from "react-debounce-input";
import QuizListContainer from "../components/QuizListContainer/QuizListContainer";

const Home = () => {
  const [filter, setFilter] = useState();

  return (
    <Box width="100%">
      <Box width="50%" mx="auto" mt={10}>
        <DebounceInput
          onChange={(e) => setFilter(e.target.value)}
          debounceTimeout={500}
          placeholder="Enter quiz name..."
        />
      </Box>
      <QuizListContainer filter={filter} />
    </Box>
  );
};

export default Home;
