import React, { FC, useContext, useMemo } from "react";

import { CardListSection } from "@geobuff/buff-ui/components";

import { useBreakpointValue } from "@chakra-ui/react";

import { LanguageContext } from "../../contexts/LanguageContext";

import { QuizSearchResults } from "../../types/quiz-search-results";
import HomeSearchResultItems from "./HomeSearchResultItems";

const GRID_LENGTH = 5;

export interface Props {
  isSearching?: boolean;
  searchResults?: QuizSearchResults;
  filter?: string;
}

const HomeSearchResults: FC<Props> = ({
  isSearching = true,
  searchResults = null,
  filter = "",
}) => {
  const { t } = useContext(LanguageContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const searchResultItems = useMemo(
    () => <HomeSearchResultItems searchResults={searchResults} />,
    [searchResults]
  );

  return (
    <CardListSection
      isMobile={isMobile}
      isLoading={isSearching}
      lessItemsThanGrid={searchResults?.length < GRID_LENGTH}
      title={
        isSearching
          ? `${t.homeSearchResults.searchingFor} '${filter}' `
          : `${t.homeSearchResults.searchResultsFor} '${filter}'`
      }
      paddingX={3}
    >
      {searchResultItems}
    </CardListSection>
  );
};

export default HomeSearchResults;
