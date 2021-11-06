import React, { FC } from "react";

import { Box, Divider, Flex, Tag, Text } from "@chakra-ui/react";

import Twemoji from "../Twemoji";
import Image from "../Image";

const twemojiResponsiveStyles = { base: "10px", sm: "10px", md: "12px" };

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

interface Props {
  name?: string;
  imageUrl?: string;
  price?: number;
  sizes?: string[];
  soldOut?: boolean;
  isExternal?: boolean;
}

const ProductCard: FC<Props> = ({
  name = "",
  imageUrl = "",
  price = 0.0,
  sizes = [],
  soldOut = false,
  isExternal = false,
}) => (
  <Flex
    aria-label={`game card for ${name}`}
    role="group"
    direction="column"
    width="100%"
  >
    <Box position="absolute" top={0} left={0} right={0} bottom={0}>
      <Box position="relative">
        {!isExternal && soldOut && (
          <Tag position="absolute" top="2" left="2">
            Sold Out
          </Tag>
        )}
        <Image
          src={imageUrl}
          maxHeight={{ base: "140px", md: "160px" }}
          minHeight={{ base: "140px", md: "160px" }}
          backgroundColor="#E3E1E1"
          width="100%"
          borderTopLeftRadius={12}
          borderTopRightRadius={12}
          objectFit="cover"
          transition="all 150ms ease-out"
          _groupHover={{
            maxHeight: { base: "132px", md: "156px" },
            minHeight: { base: "132px", md: "156px" },
          }}
        />
      </Box>

      <Box paddingTop="12px" paddingX="12px">
        <Text
          fontWeight="bold"
          fontSize="18px"
          marginBottom="16px"
          noOfLines={3}
          _groupHover={{ textDecoration: "underline" }}
        >
          {name}
        </Text>
      </Box>

      <Box position="absolute" bottom={0} left={0} right={0}>
        {divider}

        {isExternal ? (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginTop="8px"
            marginBottom="8px"
            marginX="12px"
          >
            <Flex alignItems="center">
              <Twemoji
                emoji="🔗"
                height={twemojiResponsiveStyles}
                width={twemojiResponsiveStyles}
              />
              <Text
                fontSize={{ base: "9px", sm: "9px", md: "11px" }}
                fontWeight="bold"
                marginLeft={2}
              >
                Sold Externally
              </Text>
            </Flex>
          </Flex>
        ) : (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginTop="8px"
            marginBottom="8px"
            marginX="12px"
          >
            <Flex alignItems="center">
              <Twemoji
                emoji="📏"
                height={twemojiResponsiveStyles}
                width={twemojiResponsiveStyles}
              />
              <Text
                fontSize={{ base: "9px", sm: "9px", md: "11px" }}
                fontWeight="bold"
                marginLeft={2}
                isTruncated
                minWidth="50%"
              >
                {sizes.join(", ")}
              </Text>
            </Flex>
            <Flex alignItems="center">
              <Twemoji
                emoji="💲"
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
                {price}
              </Text>
            </Flex>
          </Flex>
        )}
      </Box>
    </Box>
  </Flex>
);

export default React.memo(ProductCard);
