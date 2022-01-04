import React, { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import Image from "../Image";

export interface Props {
  name?: string;
  imageUrl?: string;
}

const DailyTriviaCard: FC<Props> = ({ name = "", imageUrl = "" }) => (
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
        src={imageUrl}
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
    </Box>
  </Flex>
);

export default React.memo(DailyTriviaCard);
