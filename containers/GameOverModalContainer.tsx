import React, { FC, useContext, useEffect, useState } from "react";

import { GameOverModal } from "@geobuff/buff-ui/components";

import { ToastPosition, useBreakpointValue, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { AppContext } from "../contexts/AppContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { LanguageContext } from "../contexts/LanguageContext";

import axiosClient from "../axios/axiosClient";
import { genericToast, increaseXPToast } from "../helpers/toasts";
import { GameOverRedirect } from "../types/game-over-redirect";
import { IncreaseUserXPPayload } from "../types/increase-user-xp-payload";
import { LeaderboardEntry } from "../types/leaderboard-entry";
import { MappingEntry } from "../types/mapping-entry";
import { Result } from "../types/result";
import { TempScore } from "../types/temp-score";

interface Props {
  id?: number;
  hasLeaderboard?: boolean;
  route?: string;
  name?: string;
  maxScore?: number;
  score?: number;
  time?: number;
  checkedSubmissions?: MappingEntry[];
  recentSubmissions?: Result[];
  isOpen?: boolean;
  onClose?: () => void;
  isXPUpdated?: boolean;
  setXPUpdated?: React.Dispatch<React.SetStateAction<boolean>>;
  setLeaderboardEntrySubmitted?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameOverModalContainer: FC<Props> = ({
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
  const { t } = useContext(LanguageContext);
  const toast = useToast();
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { user, updateUser } = useContext(CurrentUserContext);
  const { data, status } = useSession();
  const session = data as any;

  const { isNotchedIphone } = useContext(AppContext);

  const toastPosition: ToastPosition = useBreakpointValue({
    base: "bottom",
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

    if (status === "loading") {
      return;
    }

    axiosClient.put(`/quiz-plays/${id}`);
    if (status === "unauthenticated" || score === 0) {
      setIsLoading(false);
      return;
    }

    if (!isXPUpdated) {
      increaseXP();
      setXPUpdated(true);
    }
  }, [isOpen, status]);

  // When user loads in or modal is opened,
  // get a fresh leaderboard entry
  useEffect(() => {
    if (status === "authenticated") {
      axiosClient
        .get(`/leaderboard/${id}/${user.id}`)
        .then((response) => {
          if (response.status === 200) {
            setEntry(response.data);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, status]);

  const increaseXP = (): void => {
    const payload: IncreaseUserXPPayload = {
      score: score,
      maxScore: maxScore,
    };

    axiosClient
      .put(`/users/xp/${user.id}`, payload, session?.authConfig)
      .then((response) => {
        const increase = response.data;
        toast(
          increaseXPToast(
            `${increase} GeoCoin${increase > 1 ? "s" : ""} ${
              t.toasts.geoCoinDescription
            }`,
            t.global.closeCircle,
            increase,
            toastPosition
          )
        );

        updateUser({
          ...user,
          xp: user.xp + increase,
        });
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
        session?.authConfig
      )
      .then(() => {
        setIsSubmitting(false);
        onClose();
        toast(
          genericToast(
            t.toasts.leaderboardEntrySubmittedTitle,
            toastPosition !== "bottom" &&
              t.toasts.leaderboardEntrySubmittedDescription,
            9000
          )
        );
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
        session?.authConfig
      )
      .then(() => {
        setIsSubmitting(false);
        onClose();
        toast(
          genericToast(
            t.toasts.leaderboardEntrySubmittedTitle,
            toastPosition !== "bottom" &&
              t.toasts.leaderboardEntrySubmittedDescription,
            9000
          )
        );
      });
  };

  return (
    <GameOverModal
      isMobile={isMobile}
      quizScoreType={hasLeaderboard ? "leaderboard" : "score"}
      quizName={name}
      maxScore={maxScore}
      score={score}
      time={time}
      existingEntry={entry}
      isLoggedIn={!!user}
      isLoading={isLoading}
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      isNotchedIphone={isNotchedIphone}
      submitText={t.global.submit}
      gameOverText={t.global.gameOver}
      backToMapText={t.gameOverModal.backToMapText}
      backToMapExplainer={t.gameOverModal.backToMapExplainer}
      explainerTextOne={t.gameOverModalExplainerText.explainerTextOne}
      explainerActionOne={t.global.login}
      explainerTextTwo={` ${t.global.or} `}
      explainerActionTwo={t.global.register}
      submitAScoreText={t.gameOverModalExplainerText.submitAScoreText}
      submitALeaderboardEntryText={
        t.gameOverModalExplainerText.submitALeaderboardEntryText
      }
      scoreQuizLoggedInExplainer={
        t.gameOverModalExplainerText.scoreQuizLoggedInExplainer
      }
      noExistingEntryExplainer={
        t.gameOverModalExplainerText.noExistingEntryExplainer
      }
      existingEntryText={t.gameOverModalExplainerText.existingEntry}
      existingEntryExplainer={
        t.gameOverModalExplainerText.existingEntryExplainer
      }
      rankText={t.global.rank}
      scoreText={t.global.score}
      timeText={t.global.time}
      usernameText={t.global.username}
      onClose={onClose}
      onSubmit={hasLeaderboard ? handleSubmitEntry : null}
      onRedirectWithScore={handleRedirectWithScore}
    />
  );
};
