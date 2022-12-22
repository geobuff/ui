import React, { FC, useContext } from "react";

import { QuizCard, Share, Twemoji } from "@geobuff/buff-ui/components";

import {
  Button,
  GridItem,
  GridItemProps,
  Link,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";

import { LanguageContext } from "../contexts";

import { formatDate } from "../helpers/date";
import { cardImageStyle } from "../helpers/style";
import { genericToast } from "../helpers/toasts";
import { Trivia } from "../types/trivia";

interface Props extends GridItemProps {
  index: number;
  triviaCount: number;
  trivia: Trivia;
}

export const TriviaCardContainer: FC<Props> = ({
  index,
  triviaCount,
  trivia,
  ...props
}) => {
  const { t } = useContext(LanguageContext);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();

  const twemojiDimensions = useBreakpointValue({
    base: "10px",
    md: "12px",
  });

  const image = (
    <Image
      src={`${process.env.NEXT_PUBLIC_CDN_URL}/headers/daily-trivia-header.svg`}
      alt={trivia.name}
      height={100}
      width={260}
      objectFit="cover"
      style={cardImageStyle}
      priority
    />
  );

  const handleCopyLink = (e: any): void => {
    e.preventDefault();

    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_SITE_URL}/daily-trivia/${formatDate(
        trivia.date
      )}`
    );

    toast(
      genericToast(
        `${t.toasts.copyLinkTitleOne} ${t.global.dailyTriviaUpper} ${t.toasts.copyLinkTitleTwo}`,
        t.toasts.copyLinkDescription
      )
    );
  };

  const bottomLeftContent = (
    <>
      <Button variant="link" onClick={handleCopyLink}>
        <Share height={twemojiDimensions} width={twemojiDimensions} />
        <Text
          fontSize={{ base: "9px", sm: "9px", md: "11px" }}
          fontWeight="bold"
          marginLeft="3px"
          noOfLines={1}
          minWidth="50%"
        >
          {t.global.shareQuiz}
        </Text>
      </Button>
    </>
  );

  const bottomRightContent = (
    <>
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
        {`${trivia.maxScore} ${t.global.questions}`}
      </Text>
    </>
  );

  return (
    <GridItem
      paddingRight={{
        base: index === triviaCount - 1 && "12px",
        md: 0,
      }}
      {...props}
    >
      <Link href={`/daily-trivia/${formatDate(trivia?.date)}`}>
        <QuizCard
          isMobile={isMobile}
          heading={trivia.name}
          image={image}
          bottomLeftContent={bottomLeftContent}
          bottomRightContent={bottomRightContent}
          position={{ base: "relative", md: "absolute" }}
          marginLeft={{ base: 3, md: 0 }}
        />
      </Link>
    </GridItem>
  );
};
