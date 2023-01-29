import React, { FC, useContext } from "react";

import {
  LoadingImage,
  QuizCard,
  Twemoji,
  User,
} from "@geobuff/buff-ui/components";

import {
  GridItem,
  GridItemProps,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import { LanguageContext } from "../contexts/LanguageContext";

import { cardImageStyle } from "../helpers/style";
import { CommunityQuiz } from "../types/community-quiz-dto";

interface Props extends GridItemProps {
  index: number;
  quizCount: number;
  quiz: CommunityQuiz;
}

export const CommunityQuizCardContainer: FC<Props> = ({
  index,
  quizCount,
  quiz,
  ...props
}) => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const { t } = useContext(LanguageContext);

  const twemojiDimensions = useBreakpointValue({
    base: "10px",
    md: "12px",
  });

  const image = (
    <LoadingImage
      src={`${process.env.NEXT_PUBLIC_CDN_URL}/headers/community-quiz-header.svg`}
      alt={quiz.name}
      height={100}
      width={isMobile ? 180 : 225}
      objectFit="cover"
      style={cardImageStyle}
    />
  );

  const bottomLeftContent = (
    <>
      <User height={twemojiDimensions} width={twemojiDimensions} />
      <Link href={`/profile/${quiz.userId}`}>
        <Text
          fontSize={{ base: "9px", sm: "9px", md: "11px" }}
          fontWeight="bold"
          marginLeft="3px"
          noOfLines={1}
          minWidth="50%"
        >
          {quiz.username}
        </Text>
      </Link>
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
        {`${quiz.maxScore} ${t.global.questions}`}
      </Text>
    </>
  );

  const card = (
    <QuizCard
      isMobile={isMobile}
      isVerified={quiz.verified}
      heading={quiz.name}
      image={image}
      bottomLeftContent={bottomLeftContent}
      bottomRightContent={bottomRightContent}
      position={{ base: "relative", md: "absolute" }}
      marginLeft={{ base: 3, md: 0 }}
    />
  );

  return (
    <GridItem
      paddingRight={{
        base: index === quizCount - 1 && "12px",
        md: 0,
      }}
      {...props}
    >
      {quiz.isPublic ? (
        <Link href={`/community-quiz/${quiz.id}`}>{card}</Link>
      ) : (
        card
      )}
    </GridItem>
  );
};
