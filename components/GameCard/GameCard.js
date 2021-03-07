import React from "react";
import PropTypes from "prop-types";

import { Box, Divider, Flex, Text, Image } from "@chakra-ui/react";

import Twemoji from "../Twemoji";
// import twemoji from "twemoji";

import { getTitle, getTotal, getVerb } from "../../helpers/quizzes";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

const GameCard = ({ quiz }) => {
  return (
    <Flex
      role="group"
      direction="column"
      aria-label={`game card for ${getTitle(quiz)}`}
      backgroundColor="white"
      borderRadius={12}
      width="100%"
      boxShadow="0px 4px 4px rgba(179, 187, 209, 0.25)"
    >
      <Box position="absolute" top={0} left={0} right={0} bottom={0}>
        <Image
          src="https://twemoji.maxcdn.com/v/13.0.1/svg/1f1fa-1f1f8.svg"
          maxHeight={{ base: "75px", md: "85px" }}
          minHeight={{ base: "75px", md: "85px" }}
          backgroundColor="red"
          width="100%"
          borderTopLeftRadius={12}
          borderTopRightRadius={12}
          objectFit="cover"
          transition="all 150ms ease-out"
          _groupHover={{
            maxHeight: { base: "80px", md: "88px" },
            minHeight: { base: "80px", md: "88px" },
          }}
        />

        <Box paddingTop="12px" paddingX="12px">
          <Text
            fontWeight="bold"
            fontSize="18px"
            marginBottom="16px"
            noOfLines={3}
            _groupHover={{ textDecoration: "underline" }}
          >
            {getTitle(quiz)}
          </Text>
        </Box>

        <Box position="absolute" bottom={0} left={0} right={0}>
          {divider}

          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginTop="8px"
            marginBottom="8px"
            marginX="12px"
          >
            <Flex alignItems="center">
              <Twemoji
                emoji="⏱"
                height={{ base: "10px", sm: "10px", md: "12px" }}
                width={{ base: "10px", sm: "10px", md: "12px" }}
              />
              <Text
                fontSize={{ base: "9px", sm: "9px", md: "11px" }}
                fontWeight="bold"
                marginLeft="2.5px"
              >
                {"15:00 mins"}
              </Text>
            </Flex>
            <Flex alignItems="center">
              <Twemoji
                emoji="❓"
                height={{ base: "10px", sm: "10px", md: "12px" }}
                width={{ base: "10px", sm: "10px", md: "12px" }}
              />
              <Text
                fontSize={{ base: "9px", sm: "9px", md: "11px" }}
                fontWeight="bold"
                marginLeft="2.5px"
              >
                {`${getTotal(quiz)} ${getVerb(quiz)}`}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

GameCard.propTypes = {
  quiz: PropTypes.number,
};
GameCard.defaultProps = {
  quiz: 1,
};

export default GameCard;
