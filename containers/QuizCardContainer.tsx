import React, { FC, useContext } from "react";

import { QuizCard, Twemoji } from "@geobuff/buff-ui/components";

import { GridItem, Text, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";

import { LanguageContext } from "../contexts";

import { cardImageStyle } from "../helpers/style";
import { secondsToMinutesString } from "../helpers/time";
import { Quiz } from "../types/quiz";

interface Props {
  index: number;
  quizCount: number;
  quiz: Quiz;
}

export const QuizCardContainer: FC<Props> = ({ index, quizCount, quiz }) => {
  const { t } = useContext(LanguageContext);

  const twemojiDimensions = useBreakpointValue({
    base: "10px",
    md: "12px",
  });

  const image = (
    <Image
      src={quiz.imageUrl}
      alt={quiz.name}
      height={100}
      width={260}
      objectFit="cover"
      style={cardImageStyle}
    />
  );

  const bottomLeftContent = (
    <>
      <Twemoji emoji="⏱" height={twemojiDimensions} width={twemojiDimensions} />
      <Text
        fontSize={{ base: "9px", sm: "9px", md: "11px" }}
        fontWeight="bold"
        marginLeft="2.5px"
        noOfLines={1}
        minWidth="50%"
      >
        {`${secondsToMinutesString(quiz.time)} ${t.global.mins}`}
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
        {`${quiz.maxScore} ${quiz.plural}`}
      </Text>
    </>
  );

  return (
    <GridItem
      paddingRight={{
        base: index === quizCount - 1 && "12px",
        md: 0,
      }}
    >
      <QuizCard
        href={`/quiz/${quiz?.route}`}
        isEnabled={quiz.enabled}
        heading={quiz.name}
        image={image}
        bottomLeftContent={bottomLeftContent}
        bottomRightContent={bottomRightContent}
        position={{ base: "relative", md: "absolute" }}
        marginLeft={{ base: 3, md: 0 }}
      />
    </GridItem>
  );
};
