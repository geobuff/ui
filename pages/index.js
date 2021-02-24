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
    <Flex width="100%" mx="auto" position="relative" alignItems="flex-start">
      <Box position="absolute" left="0" right="0" top="0">
        <Box
          background="linear-gradient(90deg, #44D581 0%, #27AE60 100%)"
          width="100%"
          height={{
            base: "225px",
            sm: "250px",
            md: "300px",
          }}
        >
          <Box
            background="url(/world-map.svg)"
            backgroundRepeat="no-repeat"
            backgroundSize={{
              base: "400px 200px",
              sm: "450px 250px",
              md: "650px 350px",
            }}
            backgroundPosition={{
              base: "right -175px top 20px",
              sm: "right -170px top 20px",
              md: "right -20px top -10px",
            }}
            height="100%"
          >
            <Box padding={{ base: 3, sm: 6, md: 12 }}>
              <Text fontSize="48px" fontWeight="black" lineHeight="100%">
                {"Welcome to"}
              </Text>
              <Text fontSize="48px" fontWeight="black">
                {"GeoBuff"}
              </Text>
            </Box>
          </Box>
        </Box>
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
  );
};

export default Home;
