import React, { FC, useContext } from "react";

import { Twemoji } from "@geobuff/buff-ui/components";

import {
  Box,
  Divider,
  Flex,
  FlexProps,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";

import { LanguageContext } from "../../contexts/LanguageContext";

import { cardImageStyle } from "../../helpers/style";
import { secondsToMinutesString } from "../../helpers/time";

const divider = <Divider borderColor="#E3E1E1" borderWidth={1} my={2} />;

export interface Props extends FlexProps {
  name?: string;
  imageUrl?: string;
  time?: number;
  maxScore?: number;
  plural?: string;
}

const QuizCard: FC<Props> = ({
  name = "",
  imageUrl = "",
  time = 0,
  maxScore = 0,
  plural = "",
  ...props
}) => {
  const { t } = useContext(LanguageContext);

  const twemojiDimensions = useBreakpointValue({
    base: "10px",
    md: "12px",
  });

  return (
    <Flex
      aria-label={`game card for ${name}`}
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
          src={imageUrl}
          alt={name}
          height={100}
          width={260}
          objectFit="cover"
          style={cardImageStyle}
        />
        <Flex paddingTop="12px" paddingX="12px" whiteSpace="pre-wrap">
          <Text
            fontWeight="bold"
            fontSize="18px"
            marginBottom="16px"
            noOfLines={2}
            _groupHover={{ textDecoration: "underline" }}
          >
            {name}
          </Text>
        </Flex>

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
                height={twemojiDimensions}
                width={twemojiDimensions}
              />
              <Text
                fontSize={{ base: "9px", sm: "9px", md: "11px" }}
                fontWeight="bold"
                marginLeft="2.5px"
                noOfLines={1}
                minWidth="50%"
              >
                {`${secondsToMinutesString(time)} ${t.global.mins}`}
              </Text>
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
                {`${maxScore} ${plural}`}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default React.memo(QuizCard);
