import React, { useState, useCallback, FC, ChangeEvent } from "react";
import { debounce } from "debounce";

import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Fade,
  IconButton,
} from "@chakra-ui/react";

import MainView from "../components/MainView";
import HeroBanner from "../components/HeroBanner";

import QuizListContainer from "../containers/QuizListContainer";

import Search from "../Icons/Search";
import SolidCloseCircle from "../Icons/SolidCloseCircle";

const Home: FC = () => {
  const [filter, setFilter] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleClearInput = (): void => {
    setInputValue("");
    setFilter("");
  };

  const onChange = (value: string): void => {
    setFilter(value);
  };

  const handleDebounceChange = useCallback(debounce(onChange, 500), [onChange]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;
    setInputValue(value);
    handleDebounceChange(value);
  };

  return (
    <MainView>
      <HeroBanner />
      <Box>
        <Box
          mx="auto"
          position="relative"
          left={0}
          right={0}
          bottom="21px"
          maxWidth={{
            base: "85%",
            sm: "80%",
            md: "40%",
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
              value={inputValue}
            />
            <InputRightElement>
              <Fade in={inputValue?.length > 0}>
                <IconButton
                  aria-label="close circle"
                  position="absolute"
                  top="11px"
                  right={3}
                  maxHeight="22px"
                  minWidth="22px"
                  backgroundColor="transparent"
                  borderRadius={25}
                  onClick={handleClearInput}
                  color="#a6a6a6"
                  fontWeight="bold"
                  _hover={{ backgroundColor: "transparent", color: "#5c5c5c" }}
                >
                  <SolidCloseCircle height={5} width={5} padding={0} />
                </IconButton>
              </Fade>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>

      <QuizListContainer filter={filter} />
    </MainView>
  );
};

export default Home;
