import React, { FC } from "react";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";

import Image from "../Image";
import Twemoji from "../Twemoji";
import Share from "../../Icons/Share";

const twemojiResponsiveStyles = { base: "10px", sm: "10px", md: "12px" };

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

export interface Props {
  name?: string;
}

const DailyTriviaCard: FC<Props> = ({ name = "" }) => (
  <Flex
    aria-label={`trivia card for ${name}`}
    role="group"
    direction="column"
    backgroundColor="white"
    borderRadius={12}
    width="100%"
    boxShadow="0px 4px 4px rgba(179, 187, 209, 0.25)"
  >
    <Box position="absolute" top={0} left={0} right={0} bottom={0}>
      <Image
        src="/daily-trivia-header.svg"
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
            <Share
              height={twemojiResponsiveStyles}
              width={twemojiResponsiveStyles}
            />
            <Text
              fontSize={{ base: "9px", sm: "9px", md: "11px" }}
              fontWeight="bold"
              marginLeft="3px"
              isTruncated
              minWidth="50%"
            >
              {"Share Quiz"}
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
              minWidth="50%"
              maxWidth={{ base: "65px", md: "85px" }}
              isTruncated
            >
              {"10 Questions"}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  </Flex>
);

export default React.memo(DailyTriviaCard);