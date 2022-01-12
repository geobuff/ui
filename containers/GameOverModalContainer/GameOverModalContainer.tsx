import React, { useEffect, useState, FC, useContext } from "react";
import { useRouter } from "next/router";

import { ToastPosition, useBreakpointValue, useToast } from "@chakra-ui/react";

import GameOverModal from "../../components/GameOverModal";
import axiosClient from "../../axios/axiosClient";
import { LeaderboardEntry } from "../../types/leaderboard-entry";

import {
  entrySubmitted,
  increaseXP as increaseXPToast,
} from "../../helpers/toasts";
import { GameOverRedirect } from "../../types/game-over-redirect";
import { TempScore } from "../../types/temp-score";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { Mapping } from "../../types/mapping";
import { Result } from "../../types/result";
import { IncreaseUserXPPayload } from "../../types/increase-user-xp-payload";

interface Props {
  id?: number;
  hasLeaderboard?: boolean;
  route?: string;
  name?: string;
  maxScore?: number;
  score?: number;
  time?: number;
  checkedSubmissions?: Mapping[];
  recentSubmissions?: Result[];
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
  checkedSubmissions = [],
  recentSubmissions = [],
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
  } = useContext(CurrentUserContext);

  const toastPosition: ToastPosition = useBreakpointValue({
    base: "top",
    md: "bottom-right",
  });

  const [entry, setEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlaysUpdated, setIsPlaysUpdated] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(true);
      return;
    }

    if (isUserLoading) {
      return;
    }

    if (!isPlaysUpdated) {
      axiosClient.put(`/quiz-plays/${id}`);
      setIsPlaysUpdated(true);
    }

    if (!user || score === 0) {
      setIsLoading(false);
      return;
    }

    if (!isXPUpdated) {
      increaseXP();
      setXPUpdated(true);
    }

    if (!hasLeaderboard) {
      setIsLoading(false);
    } else {
      getLeaderboardEntry();
    }
  }, [isOpen, isUserLoading, user]);

  const increaseXP = (): void => {
    const payload: IncreaseUserXPPayload = {
      score: score,
      maxScore: maxScore,
    };

    axiosClient
      .put(`/users/xp/${user.id}`, payload, getAuthConfig())
      .then((response) => {
        const increase = response.data;
        toast(increaseXPToast(increase, toastPosition));

        updateUser({
          ...user,
          xp: user.xp + increase,
        });
      });
  };

  const getLeaderboardEntry = (): void => {
    axiosClient
      .get(`/leaderboard/${id}/${user.id}`)
      .then((response) => {
        if (response.status === 200) {
          setEntry(response.data);
        }
      })
      .finally(() => setIsLoading(false));
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
    const tempScore: TempScore = {
      score,
      time,
      results: checkedSubmissions.map((x) => x.svgName),
      recents: recentSubmissions.map((x) => x.svgName),
    };
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
