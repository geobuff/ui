import React, { useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { debounce } from "debounce";

import { Box, Input, Flex } from "@chakra-ui/core";
import QuizListContainer from "../containers/QuizListContainer";

import HeroBannerContainer from "../containers/HeroBannerContainer";

const Home = () => {
  const [filter, setFilter] = useState();

  const { user } = useAuth0();
  console.log(user, "user");

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
        <HeroBannerContainer username="Kirb" />
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
