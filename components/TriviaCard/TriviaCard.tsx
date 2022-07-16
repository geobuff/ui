import React, { FC } from "react";
import { Box, BoxProps, Divider, Flex, Text } from "@chakra-ui/react";

import Image from "next/image";
import Twemoji from "../Twemoji";
import { cardImageStyle } from "../../helpers/style";

const twemojiResponsiveStyles = { base: "10px", sm: "10px", md: "12px" };

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

export interface Props extends BoxProps {
  name?: string;
  maxScore?: number;
}

const TriviaCard: FC<Props> = ({ name = "", maxScore = 0, ...props }) => (
  <Box
    aria-label={`trivia card for ${name}`}
    role="group"
    direction="column"
    backgroundColor="white"
    borderRadius={12}
    width="100%"
    height="100%"
    boxShadow="0px 4px 4px rgba(179, 187, 209, 0.25)"
    {...props}
  >
    <Box position="absolute" top={0} left={0} right={0} bottom={0}>
      <Image
        src={`${process.env.NEXT_PUBLIC_CDN_URL}/headers/daily-trivia-header.svg`}
        alt={name}
        height={100}
        width={260}
        objectFit="cover"
        style={cardImageStyle}
        priority
      />

      <Box paddingTop="12px" paddingX="12px" whiteSpace="pre-wrap">
        <Text
          fontWeight="bold"
          fontSize="18px"
          marginBottom="16px"
          noOfLines={2}
          _groupHover={{ textDecoration: "underline" }}
        >
          {name}
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
            {/* <Share
              height={twemojiResponsiveStyles}
              width={twemojiResponsiveStyles}
            />
            <Text
              fontSize={{ base: "9px", sm: "9px", md: "11px" }}
              fontWeight="bold"
              marginLeft="3px"
              noOfLines={1}
              minWidth="50%"
            >
              {"Share Quiz"}
            </Text> */}
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
              minWidth="50%"
              maxWidth={{ base: "65px", md: "85px" }}
              noOfLines={1}
            >
              {`${maxScore} Questions`}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  </Box>
);

export default React.memo(TriviaCard);
