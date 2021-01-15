import React, { useState } from "react";
import { Box, Input } from "@chakra-ui/core";
import QuizListContainer from "../components/QuizListContainer/QuizListContainer";

const Home = () => {
  const [filter, setFilter] = useState();

  return (
    <Box width="100%">
      <Box width="50%" mx="auto">
        <Input
          mt={10}
          placeholder="Enter quiz name..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </Box>
      <QuizListContainer filter={filter} />
    </Box>
  );
};

export default Home;
