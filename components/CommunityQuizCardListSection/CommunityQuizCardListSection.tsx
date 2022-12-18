import React, { FC, useContext } from "react";

import { CardListSection } from "@geobuff/buff-ui/components";

import { useBreakpointValue } from "@chakra-ui/react";

import { LanguageContext } from "../../contexts/LanguageContext";

import { CommunityQuiz } from "../../types/community-quiz-dto";
import CardListItem from "../CardList/CardListItem";
import CommunityQuizCard from "../CommunityQuizCard/CommunityQuizCard";

const GRID_LENGTH = 5;

export interface Props {
  quizzes?: CommunityQuiz[];
  isLoading?: boolean;
}

const CommunityQuizCardListSection: FC<Props> = ({
  quizzes = [],
  isLoading = false,
}) => {
  const { t } = useContext(LanguageContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <CardListSection
      isMobile={isMobile}
      isLoading={isLoading}
      lessItemsThanGrid={quizzes.length < GRID_LENGTH}
      title={t.global.communityQuizzesUpper}
      linkHref="/community-quiz"
      linkText={`${t.global.seeAll}${
        isMobile ? "" : ` ${t.global.communityQuizzesLower}`
      }`}
      paddingX={{ base: 3, md: 0 }}
    >
      {quizzes.map((quiz, index) => (
        <CardListItem
          key={quiz.id}
          href={`/community-quiz/${quiz.id}`}
          paddingRight={{
            base: index === quizzes.length - 1 && "12px",
            md: 0,
          }}
        >
          <CommunityQuizCard
            name={quiz.name}
            userId={quiz.userId}
            username={quiz.username}
            maxScore={quiz.maxScore}
            verified={quiz.verified}
            position={{ base: "relative", md: "absolute" }}
            marginLeft={{ base: 3, md: 0 }}
          />
        </CardListItem>
      ))}
    </CardListSection>
  );
};

export default CommunityQuizCardListSection;
