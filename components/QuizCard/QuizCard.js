import React from "react";
import PropTypes from "prop-types";

import { Box, Divider, Flex, Text } from "@chakra-ui/react";

import Twemoji from "../Twemoji";
import Image from "../Image";
import { secondsToMinutesString } from "../../helpers/time";

const twemojiResponsiveStyles = { base: "10px", sm: "10px", md: "12px" };

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

const QuizCard = ({ quiz }) => (
  <Flex
    aria-label={`game card for ${quiz.name}`}
    role="group"
    direction="column"
    backgroundColor="white"
    borderRadius={12}
    width="100%"
    boxShadow="0px 4px 4px rgba(179, 187, 209, 0.25)"
  >
    <Box position="absolute" top={0} left={0} right={0} bottom={0}>
      <Image
        src={quiz.imageUrl}
        maxHeight={{ base: "75px", md: "90px" }}
        minHeight={{ base: "75px", md: "90px" }}
        backgroundColor="#E3E1E1"
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
          {quiz.name}
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
              height={twemojiResponsiveStyles}
              width={twemojiResponsiveStyles}
            />
            <Text
              fontSize={{ base: "9px", sm: "9px", md: "11px" }}
              fontWeight="bold"
              marginLeft="2.5px"
            >
              {`${secondsToMinutesString(quiz.time)} mins`}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Twemoji
              emoji="❓"
              height={twemojiResponsiveStyles}
              width={twemojiResponsiveStyles}
            />
            <Text
              fontSize={{ base: "9px", sm: "9px", md: "11px" }}
              fontWeight="bold"
              marginLeft="2.5px"
            >
              {`${quiz.maxScore} ${quiz.verb}`}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  </Flex>
);

QuizCard.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxScore: PropTypes.number,
    time: PropTypes.number,
    mapSVG: PropTypes.string,
    imageUrl: PropTypes.string,
    verb: PropTypes.string,
    apiPath: PropTypes.string,
    route: PropTypes.string,
    hasLeaderboard: PropTypes.bool,
    hasGrouping: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
};
QuizCard.defaultProps = {
  quiz: {},
};

export default QuizCard;