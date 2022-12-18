import React, { FC, useContext } from "react";

import { Twemoji } from "@geobuff/buff-ui/components";
import { User } from "@geobuff/buff-ui/components";

import {
  Box,
  BoxProps,
  Divider,
  Flex,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import { cardImageStyle } from "../../helpers/style";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

export interface Props extends BoxProps {
  name?: string;
  userId?: number;
  username?: string;
  maxScore?: number;
  verified?: boolean;
}

const CommunityQuizCard: FC<Props> = ({
  name = "",
  userId = 0,
  username = "",
  maxScore = 0,
  verified = false,
  ...props
}) => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const { t } = useContext(LanguageContext);

  const twemojiDimensions = useBreakpointValue({
    base: "10px",
    md: "12px",
  });

  return (
    <Box
      aria-label={`community quiz card for ${name}`}
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
          src={`${process.env.NEXT_PUBLIC_CDN_URL}/headers/community-quiz-header.svg`}
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
            marginBottom="8px"
            noOfLines={2}
            _groupHover={{ textDecoration: "underline" }}
          >
            {!isMobile && verified && (
              <Flex
                direction="column"
                justifyContent="center"
                float="left"
                mr={1}
              >
                <Twemoji emoji="✅" width="20px" height="20px" mt="3.5px" />
              </Flex>
            )}{" "}
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
              <User height={twemojiDimensions} width={twemojiDimensions} />
              <Link href={`/profile/${userId}`}>
                <Text
                  fontSize={{ base: "9px", sm: "9px", md: "11px" }}
                  fontWeight="bold"
                  marginLeft="3px"
                  noOfLines={1}
                  minWidth="50%"
                >
                  {username}
                </Text>
              </Link>
            </Flex>
            <Flex alignItems="center">
              <Twemoji
                emoji="❓"
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
                {`${maxScore} ${t.global.questions}`}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(CommunityQuizCard);
