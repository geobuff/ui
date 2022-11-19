import React, { FC } from "react";

import { Alert, AlertIcon, Divider, Flex } from "@chakra-ui/react";

import UserProfileAchievementsContainer from "../../containers/UserProfileAchievementsContainer";
import UserProfileLeaderboardEntriesContainer from "../../containers/UserProfileLeaderboardEntriesContainer";
import UserProfileMyQuizzesContainer from "../../containers/UserProfileMyQuizzesContainer";
import UserProfileSummaryContainer from "../../containers/UserProfileSummaryContainer";

import { UserDto } from "../../types/user-dto";
import HeroHeader from "../HeroHeader";

const divider = <Divider borderColor="transparent" my={3} />;

interface Props {
  user?: UserDto;
  isCurrentUser?: boolean;
  error?: string;
}

const UserProfile: FC<Props> = ({
  user = null,
  isCurrentUser = false,
  error = "",
}) => (
  <>
    <HeroHeader height={{ base: "200px", md: "250px" }} />

    <Flex
      direction="column"
      borderRadius={12}
      p={5}
      width="100%"
      maxWidth={{ base: "100%", md: "850px" }}
      marginX={{ base: 0, md: "auto" }}
      marginTop={-100}
      justifyContent="center"
    >
      {error ? (
        <Alert status="error" borderRadius={6}>
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <>
          <UserProfileSummaryContainer
            isCurrentUser={isCurrentUser}
            user={user}
          />
          {divider}
          <UserProfileAchievementsContainer userId={user?.id} />
          {divider}
          <UserProfileLeaderboardEntriesContainer userId={user?.id} />
          {divider}
          <UserProfileMyQuizzesContainer
            userId={user?.id}
            isCurrentUser={isCurrentUser}
            username={user.username}
          />
        </>
      )}
    </Flex>
  </>
);

export default UserProfile;
