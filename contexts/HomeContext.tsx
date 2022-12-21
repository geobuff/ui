import React, { ChangeEvent, FC, createContext, useState } from "react";

import { debounce } from "throttle-debounce";

import { CommunityQuiz } from "../types/community-quiz-dto";
import { Quiz } from "../types/quiz";
import { QuizSearchResults } from "../types/quiz-search-results";
import { Trivia } from "../types/trivia";

export const HomeContext = createContext({
  filter: "",
  mapQuizzes: [],
  flagQuizzes: [],
  communityQuizzes: [],
  filteredTrivia: [],
  searchResults: null,
  isSearching: false,
  searchInputValue: "",
  onClearSearchInput: () => {},
  onQuizSearch: (event: ChangeEvent<HTMLInputElement>) => {},
  onSearchResultsChange: (results: QuizSearchResults) => {},
  onIsSearchingChange: (isSearching: boolean) => {},
  onMapQuizzesChange: (quizzes: Quiz[]) => {},
  onFlagQuizzesChange: (quizzes: Quiz[]) => {},
  onCommunityQuizzesChange: (quizzes: CommunityQuiz[]) => {},
  onFilteredTriviaChange: (trivia: Trivia[]) => {},
});

interface Props {
  children: React.ReactNode;
}

export const HomeContextProvider: FC<Props> = ({ children = null }) => {
  const [filter, setFilter] = useState("");
  const [searchResults, setSearchResults] = useState<QuizSearchResults>();
  const [isSearching, setIsSearching] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const [mapQuizzes, setMapQuizzes] = useState<Quiz[]>();
  const [flagQuizzes, setFlagQuizzes] = useState<Quiz[]>();
  const [communityQuizzes, setCommunityQuizzes] = useState<CommunityQuiz[]>();
  const [filteredTrivia, setFilteredTrivia] = useState<Trivia[]>();

  const onSearchResultsChange = (results: QuizSearchResults): void => {
    setSearchResults(results);
  };

  const onIsSearchingChange = (value: boolean): void => {
    setIsSearching(value);
  };

  const onMapQuizzesChange = (quizzes: Quiz[]): void => {
    setMapQuizzes(quizzes);
  };

  const onFlagQuizzesChange = (quizzes: Quiz[]): void => {
    setFlagQuizzes(quizzes);
  };

  const onCommunityQuizzesChange = (quizzes: CommunityQuiz[]): void => {
    setCommunityQuizzes(quizzes);
  };

  const onFilteredTriviaChange = (trivia: Trivia[]): void => {
    setFilteredTrivia(trivia);
  };

  const onClearSearchInput = (): void => {
    setSearchInputValue("");
    setFilter("");
    setSearchResults(null);
  };

  const onChange = (value: string): void => {
    setFilter(value);
  };

  const onDebounceChange = debounce(1000, (event) => {
    onChange(event);
  });

  const onQuizSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchInputValue(event.target.value);
    onDebounceChange(event.target.value);

    if (event.target.value?.length === 2) {
      setIsSearching(true);
    }
  };

  return (
    <HomeContext.Provider
      value={{
        filter,
        mapQuizzes,
        flagQuizzes,
        communityQuizzes,
        filteredTrivia,
        searchResults,
        isSearching,
        searchInputValue,
        onClearSearchInput,
        onQuizSearch,
        onSearchResultsChange,
        onIsSearchingChange,
        onMapQuizzesChange,
        onFlagQuizzesChange,
        onCommunityQuizzesChange,
        onFilteredTriviaChange,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
