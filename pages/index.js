import React from "react";
import { Box, Input } from "@chakra-ui/core";
import QuizListContainer from "../components/QuizListContainer/QuizListContainer";

const Home = () => (
  <Box width="100%">
    <Box width="50%" mx="auto">
      <Input mt={10} placeholder="Enter quiz name..." />
    </Box>
    <QuizListContainer />
  </Box>
);

export default Home;
