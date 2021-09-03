import React, { useEffect, useState, FC } from "react";
import { useRouter } from "next/router";

import { ToastPosition, useBreakpointValue, useToast } from "@chakra-ui/react";

import GameOverModal from "../../components/GameOverModal";

import axiosClient from "../../axios/axiosClient";
import useCurrentUser from "../../hooks/UseCurrentUser";
import { getLevel } from "../../helpers/gamification";
import { LeaderboardEntry } from "../../types/leaderboard-entry";

import {
  entrySubmitted,
  levelUp,
  increaseXP as increaseXPToast,
} from "../../helpers/toasts";
import { GameOverRedirect } from "../../types/game-over-redirect";
import { TempScore } from "../../types/temp-score";

interface Props {
  id?: number;
  hasLeaderboard?: boolean;
  route?: string;
  name?: string;
  maxScore?: number;
  score?: number;
  time?: number;
  isOpen?: boolean;
  onClose?: () => void;
  isXPUpdated?: boolean;
  setXPUpdated?: React.Dispatch<React.SetStateAction<boolean>>;
  setLeaderboardEntrySubmitted?: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameOverModalContainer: FC<Props> = ({
  id = 0,
  hasLeaderboard = false,
  route = "",
  name = "",
  maxScore = 0,
  score = 0,
  time = 0,
  isOpen = false,
  onClose = (): void => {},
  isXPUpdated = false,
  setXPUpdated = (): void => {},
  setLeaderboardEntrySubmitted = (): void => {},
}) => {
  const toast = useToast();
  const router = useRouter();

  const {
    user,
    isLoading: isUserLoading,
    updateUser,
    getAuthConfig,
  } = useCurrentUser();
  const toastPosition: ToastPosition = useBreakpointValue({
    base: "top",
    md: "bottom-right",
  });

  const [entry, setEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(true);
      return;
    }

    if (isUserLoading) {
      return;
    }

    axiosClient.put(`/plays/${id}`);
    if (!user || score === 0) {
      setIsLoading(false);
      return;
    }

    if (!isXPUpdated) {
      increaseXP(10);
      setXPUpdated(true);
    }

    if (!hasLeaderboard) {
      setIsLoading(false);
    } else {
      getLeaderboardEntry();
    }
  }, [isOpen, isUserLoading, user]);

  const increaseXP = (increase: number): void => {
    const update = {
      avatarId: user.avatarId,
      username: user.username,
      email: user.email,
      countryCode: user.countryCode,
      xp: user.xp + increase,
    };

    axiosClient.put(`/users/${user.id}`, update, getAuthConfig()).then(() => {
      toast(increaseXPToast(increase, toastPosition));

      const newLevel = getLevel(update.xp);
      if (newLevel > getLevel(user.xp)) {
        toast(levelUp(newLevel, toastPosition));
      }

      updateUser({
        ...user,
        xp: update.xp,
      });
    });
  };

  const getLeaderboardEntry = (): void => {
    axiosClient.get(`/leaderboard/${id}/${user.id}`).then((response) => {
      if (response.status !== 200) {
        setIsLoading(false);
        return;
      }

      setEntry(response.data);
      setIsLoading(false);
    });
  };

  const handleSubmitEntry = (existingEntry: LeaderboardEntry): void => {
    setIsSubmitting(true);
    if (existingEntry) {
      updateEntry(existingEntry);
    } else {
      createEntry();
    }
    setLeaderboardEntrySubmitted(true);
  };

  const handleRedirectWithScore = (pathname: string): void => {
    const tempScore: TempScore = { score, time };
    axiosClient.post("/tempscores", tempScore).then((response) => {
      const redirectData: GameOverRedirect = {
        redirect: `/quiz/${route}`,
        tempScoreId: response.data,
      };

      router.push({
        pathname: pathname,
        query: {
          data: JSON.stringify(redirectData),
        },
      });
    });
  };

  const createEntry = (): void => {
    axiosClient
      .post(
        `/leaderboard`,
        {
          quizId: id,
          userId: user.id,
          score: score,
          time: time,
        },
        getAuthConfig()
      )
      .then(() => {
        setIsSubmitting(false);
        onClose();
        toast(entrySubmitted(toastPosition));
      });
  };

  const updateEntry = (existingEntry: LeaderboardEntry): void => {
    axiosClient
      .put(
        `/leaderboard/${existingEntry.id}`,
        {
          quizId: existingEntry.quizId,
          userId: existingEntry.userId,
          score: score,
          time: time,
        },
        getAuthConfig()
      )
      .then(() => {
        setIsSubmitting(false);
        onClose();
        toast(entrySubmitted(toastPosition));
      });
  };

  return (
    <GameOverModal
      quizName={name}
      maxScore={maxScore}
      score={score}
      time={time}
      existingEntry={entry}
      isLoggedIn={!!user}
      isLoading={isLoading}
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={hasLeaderboard ? handleSubmitEntry : null}
      onRedirectWithScore={handleRedirectWithScore}
    />
  );
};

export default GameOverModalContainer;
