import React, { useState, useCallback } from "react";
import { debounce } from "debounce";

import { Box, Input, Text, Flex } from "@chakra-ui/core";
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
    <>
      <style global jsx>{`
        body {
          background-color: #f0f0f0;
        }
      `}</style>

      <Flex width="100%" mx="auto" position="relative" alignItems="flex-start">
        <Box position="absolute" left="0" right="0" top="0">
          <Box
            width="100%"
            height="35vh"
            background="linear-gradient(90deg, #44D581 0%, #27AE60 100%)"
          >
            <Box padding={12}>
              <Text fontSize="48px" fontWeight="black" lineHeight="100%">
                {"Welcome to"}
              </Text>
              <Text fontSize="48px" fontWeight="black">
                {"GeoBuff"}
              </Text>
            </Box>
            {/* <Box position="absolute" right="20px" top="75px">
              <Image height="300px" width="600px" src="/world-map.svg" />
            </Box> */}
          </Box>
          <Box
            mx="auto"
            position="relative"
            left={0}
            right={0}
            bottom="21px"
            maxWidth={{ base: "80%", md: "60%" }}
          >
            <Input
              width="100%"
              size="lg"
              onChange={handleChange}
              placeholder="Enter quiz name..."
            />
          </Box>
          <QuizListContainer filter={filter} />
        </Box>
      </Flex>
    </>
  );
};

export default Home;
