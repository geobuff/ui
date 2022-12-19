import React, { FC, useContext } from "react";

import { QuizCard, Share, Twemoji } from "@geobuff/buff-ui/components";

import { GridItem, Text, useBreakpointValue, useToast } from "@chakra-ui/react";
import Image from "next/image";

import { LanguageContext } from "../contexts";

import { formatDate } from "../helpers/date";
import { cardImageStyle } from "../helpers/style";
import { genericToast } from "../helpers/toasts";
import { Trivia } from "../types/trivia";

interface Props {
  index: number;
  triviaCount: number;
  trivia: Trivia;
}

export const TriviaCardContainer: FC<Props> = ({
  index,
  triviaCount,
  trivia,
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

  // TODO: Implement copy link functionality.
  const handleCopyLink = (quizId: number, name: string): void => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_SITE_URL}/community-quiz/${quizId}`
    );

    toast(
      genericToast(
        `${t.toasts.copyLinkTitleOne} ${name} ${t.toasts.copyLinkTitleTwo}`,
        t.toasts.copyLinkDescription
      )
    );
  };

  // TODO: Readd to QuizCard once copy link implemented.
  const bottomLeftContent = (
    <>
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
    >
      <QuizCard
        isMobile={isMobile}
        href={`/daily-trivia/${formatDate(trivia?.date)}`}
        heading={trivia.name}
        image={image}
        bottomRightContent={bottomRightContent}
        position={{ base: "relative", md: "absolute" }}
        marginLeft={{ base: 3, md: 0 }}
      />
    </GridItem>
  );
};
