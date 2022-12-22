import React, { FC, useContext } from "react";

import {
  Sparkles,
  Table,
  TableCellEntry,
  TableContainer,
  TableHeader,
  TablePaginationControls,
  Twemoji,
} from "@geobuff/buff-ui/components";

import {
  Box,
  Fade,
  Flex,
  Heading,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import flag from "country-code-emoji";
import { useSession } from "next-auth/react";
import router from "next/router";

import { LanguageContext } from "../contexts";

import AdminFlag from "../components/AdminFlag";

import { secondsToMinutesString } from "../helpers/time";
import { AuthUser } from "../types/auth-user";
import { LeaderboardEntry } from "../types/leaderboard-entry";
import { LeaderboardFilterParams } from "../types/leaderboard-filter-params";
import { Quiz } from "../types/quiz";
import { LeaderboardFiltersContainer } from "./LeaderboardFiltersContainer";

interface Props {
  entries?: LeaderboardEntry[];
  hasMoreEntries?: boolean;
  isLoading?: boolean;
  filterParams?: LeaderboardFilterParams;
  quizId?: string;
  quizzes?: Quiz[];
  onChangeQuiz?: React.Dispatch<React.SetStateAction<string>>;
  onChangeFilterParams?: React.Dispatch<
    React.SetStateAction<LeaderboardFilterParams>
  >;
  rank?: string;
  setRank?: React.Dispatch<React.SetStateAction<string>>;
}

export const LeaderboardTableContainer: FC<Props> = ({
  entries = [],
  hasMoreEntries = false,
  filterParams = { page: 0, limit: 10 },
  isLoading = false,
  quizId = "1",
  quizzes = [],
  onChangeFilterParams = (): void => {},
  onChangeQuiz = (): void => {},
  rank = "",
  setRank = (): void => {},
}) => {
  const { t } = useContext(LanguageContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const twemojiDimensions = useBreakpointValue({
    base: "26px",
    sm: "36px",
    md: "46px",
  });

  const handleChangeQuiz = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    onChangeQuiz(event.target.value);
    onChangeFilterParams({ ...filterParams, page: 0 });
  };

  const handleChangeRange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    onChangeFilterParams({
      ...filterParams,
      range: event.target.value,
      page: 0,
    });
  };

  const handleChangeSearchUsers = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onChangeFilterParams({
      ...filterParams,
      user: event.target.value,
      page: 0,
    });
  };

  const handleChangeSearchRank = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (rank) {
      router.replace("/leaderboard", undefined, { shallow: true });
    }

    const updatedRank = event?.target?.value || "0";

    setRank(updatedRank);
    onChangeFilterParams({
      ...filterParams,
      rank: updatedRank ? parseInt(updatedRank) : 0,
    });
  };

  const handleChangeLimit = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const limit = parseInt(event.target.value);
    onChangeFilterParams({ ...filterParams, limit: limit, page: 0 });
  };

  const handleNextPage = (): void => {
    onChangeFilterParams({ ...filterParams, page: filterParams.page + 1 });
  };

  const handlePreviousPage = (): void => {
    onChangeFilterParams({ ...filterParams, page: filterParams.page - 1 });
  };

  const getNodeByRank = (rank: number): React.ReactNode => {
    switch (rank) {
      case 1:
        return <Twemoji emoji="🥇" />;
      case 2:
        return <Twemoji emoji="🥈" />;
      case 3:
        return <Twemoji emoji="🥉" />;
      default:
        return <Text marginX="6px">{rank}</Text>;
    }
  };

  const getTextNodeByRank = (
    rank: number,
    userId: number,
    username: string,
    countryCode: string
  ): React.ReactNode => {
    const mainContent = (
      <Flex alignItems="center">
        <Box marginRight={3} marginTop="5.5px" alignItems="center">
          {countryCode === process.env.NEXT_PUBLIC_ADMIN_FLAG_CODE ? (
            <AdminFlag />
          ) : (
            <Twemoji emoji={flag(countryCode)} />
          )}
        </Box>
        <Link href={`/profile/${userId}`}>
          <Text fontWeight="bold">{username}</Text>
        </Link>
        {username === user?.username && (
          <Text ml={2} fontWeight={600} color="gray.500">
            {t.leaderboardTable.you}
          </Text>
        )}
      </Flex>
    );

    if (rank === 1 && !isLoading) {
      return (
        <Fade in>
          <Sparkles>{mainContent}</Sparkles>
        </Fade>
      );
    }

    return <Fade in>{mainContent}</Fade>;
  };

  const getRows = (): TableCellEntry[][] => {
    return entries.map((entry) => [
      {
        node: (
          <Flex key={1} alignItems="center">
            {getNodeByRank(entry.rank)}
          </Flex>
        ),
      },
      {
        node: getTextNodeByRank(
          entry.rank,
          entry.userId,
          entry.username,
          entry.countryCode
        ),
        minWidth: "200px",
      },
      { node: secondsToMinutesString(entry.time), isNumeric: true },
      { node: entry.score, isNumeric: true },
    ]);
  };

  const headerLeftContent = (
    <Box as="span" marginRight={1} paddingTop={1}>
      <Twemoji
        emoji="🏆"
        height={twemojiDimensions}
        width={twemojiDimensions}
      />
    </Box>
  );

  const heading = (
    <Heading
      as="h1"
      ml={{ base: 2, md: 3 }}
      fontSize={{ base: "28px", sm: "36px", md: "48px" }}
      fontWeight="bold"
    >
      {t.global.leaderboard}
    </Heading>
  );

  const header = (
    <TableHeader
      heading={heading}
      leftContent={headerLeftContent}
      isLoading={isLoading}
      marginBottom={{ base: 4, md: 6 }}
      paddingX={{ base: 3, sm: 0, md: 0 }}
    />
  );

  const filters = (
    <LeaderboardFiltersContainer
      quizId={quizId}
      quizzes={quizzes}
      isLoading={isLoading}
      onChangeQuiz={handleChangeQuiz}
      onChangeRange={handleChangeRange}
      onChangeSearchUsers={handleChangeSearchUsers}
      rank={rank}
      onChangeSearchRank={handleChangeSearchRank}
    />
  );

  const paginationControls = (
    <TablePaginationControls
      isMobile={isMobile}
      hasMoreEntries={hasMoreEntries}
      isLoading={isLoading}
      page={filterParams.page}
      onChangeLimit={handleChangeLimit}
      onNextPage={handleNextPage}
      onPreviousPage={handlePreviousPage}
      rank={rank}
      perPageText={t.global.perPage}
      previousText={t.global.previous}
      nextText={t.global.next}
    />
  );

  return (
    <TableContainer
      header={header}
      filters={filters}
      paginationControls={paginationControls}
    >
      <Table
        headers={[
          { node: t.leaderboardTable.rank },
          { node: t.leaderboardTable.username },
          { node: t.leaderboardTable.time, align: "right" },
          { node: t.leaderboardTable.score, align: "right" },
        ]}
        rows={getRows()}
        columnCount={4}
        isLoading={isLoading}
        noEntriesMessage={t.global.noEntriesAlert}
      />
    </TableContainer>
  );
};
