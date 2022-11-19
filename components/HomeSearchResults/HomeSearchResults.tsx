import React, { FC, useContext, useMemo } from "react";

import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

import { QuizSearchResults } from "../../types/quiz-search-results";
import CardListSection from "../CardListSection";
import HomeSearchResultItems from "./HomeSearchResultItems";

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

  const searchResultItems = useMemo(
    () => <HomeSearchResultItems searchResults={searchResults} />,
    [searchResults]
  );

  return (
    <CardListSection
      title={
        isSearching
          ? `${t.homeSearchResults.searchingFor} '${filter}' `
          : `${t.homeSearchResults.searchResultsFor} '${filter}'`
      }
      isLoading={isSearching}
      paddingX={3}
    >
      {searchResultItems}
    </CardListSection>
  );
};
export default HomeSearchResults;
