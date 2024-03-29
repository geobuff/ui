import React, { FC } from "react";

import { Twemoji } from "@geobuff/buff-ui/components";

import {
  Box,
  Divider,
  Flex,
  Tag,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";

import { cardImageStyle } from "../../helpers/style";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

interface Props {
  name?: string;
  imageUrl?: string;
  price?: number;
  sizes?: string[];
  soldOut?: boolean;
  isExternal?: boolean;
}

const MerchCard: FC<Props> = ({
  name = "",
  imageUrl = "",
  price = 0.0,
  sizes = [],
  soldOut = false,
  isExternal = false,
}) => {
  const twemojiDimensions = useBreakpointValue({ base: "10px", md: "12px" });

  return (
    <Flex
      aria-label={`merch card for ${name}`}
      role="group"
      direction="column"
      backgroundColor="white"
      borderRadius={12}
      width="100%"
      boxShadow="0px 4px 4px rgba(179, 187, 209, 0.25)"
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
            alt={name}
            height={160}
            width={260}
            objectFit="cover"
            style={cardImageStyle}
            priority
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
                  height={twemojiDimensions}
                  width={twemojiDimensions}
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
                  height={twemojiDimensions}
                  width={twemojiDimensions}
                />
                <Text
                  fontSize={{ base: "9px", sm: "9px", md: "11px" }}
                  fontWeight="bold"
                  marginLeft={2}
                  noOfLines={1}
                  minWidth="50%"
                >
                  {sizes.join(", ")}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Twemoji
                  emoji="💲"
                  height={twemojiDimensions}
                  width={twemojiDimensions}
                />
                <Text
                  fontSize={{ base: "9px", sm: "9px", md: "11px" }}
                  fontWeight="bold"
                  marginLeft="2.5px"
                  minWidth="50%"
                  maxWidth={{ base: "65px", md: "85px" }}
                  noOfLines={1}
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
};

export default React.memo(MerchCard);
