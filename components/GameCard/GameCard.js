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
      direction="column"
      aria-label={`game card for ${getTitle(quiz)}`}
      backgroundColor="white"
      borderRadius={12}
      //   minHeight="220px"
      //   maxHeight="220px"
      width="100%"
      boxShadow="0px 4px 4px rgba(179, 187, 209, 0.25)"
    >
      <Image
        src="https://twemoji.maxcdn.com/v/13.0.1/svg/1f1fa-1f1f8.svg"
        maxHeight="90px"
        minHeight="90px"
        backgroundColor="red"
        width="100%"
        borderTopLeftRadius={12}
        borderTopRightRadius={12}
        objectFit="cover"
      />
      <Box paddingTop="12px" paddingX="12px">
        <Text
          fontWeight="bold"
          fontSize="18px"
          marginBottom="16px"
          minHeight="50px"
          maxHeight="50px"
          noOfLines={3}
        >
          {getTitle(quiz)}
        </Text>

        <Flex direction="column" justifyContent="flex-end" height="100%">
          {divider}

          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginTop="7px"
            marginBottom="6px"
            marginX="4px"
          >
            <Flex>
              <Twemoji emoji="⏱" height="12px" width="12px" />
              <Text fontSize="10px" fontWeight="bold" marginLeft={2}>
                {"15:00 minutes"}
              </Text>
            </Flex>
            <Flex>
              <Twemoji emoji="❓" height="12px" width="12px" />
              <Text fontSize="10px" fontWeight="bold" marginLeft={2}>
                {`${getTotal(quiz)} ${getVerb(quiz)}`}
              </Text>
            </Flex>
          </Flex>
        </Flex>
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
