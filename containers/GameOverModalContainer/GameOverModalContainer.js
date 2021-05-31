import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { useBreakpointValue, useToast } from "@chakra-ui/react";

import GameOverModal from "../../components/GameOverModal";

import axiosClient from "../../axios/axiosClient";
import useCurrentUser from "../../hooks/UseCurrentUser";
import { getLevel } from "../../helpers/gamification";

import {
  entrySubmitted,
  scoreSubmitted,
  levelUp,
  increaseXP as increaseXPToast,
} from "../../helpers/toasts";

const GameOverModalContainer = ({
  quiz,
  score,
  time,
  isOpen,
  onClose,
  isScoreSubmitted,
  setScoreSubmitted,
  setLeaderboardEntrySubmitted,
}) => {
  const toast = useToast();
  const router = useRouter();

  const { user, isLoading: isUserLoading, updateUser } = useCurrentUser();
  const toastPosition = useBreakpointValue({ base: "top", md: "bottom-right" });

  const [config, setConfig] = useState(null);
  const [entry, setEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isUserLoading && user) {
      setConfig({
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
  }, [isUserLoading, user]);

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(true);
      return;
    }

    if (isUserLoading) {
      return;
    }

    axiosClient.put(`/plays/${quiz.id}`);
    if (!user || score === 0) {
      setIsLoading(false);
      return;
    }

    if (!isScoreSubmitted) {
      increaseXP(10);
      handleScore();
      setScoreSubmitted(true);
    }

    if (!quiz.hasLeaderboard) {
      setIsLoading(false);
    } else {
      getLeaderboardEntry(user.id);
    }
  }, [isOpen, isUserLoading, user]);

  const increaseXP = (increase) => {
    const update = {
      avatarId: user.avatarId,
      username: user.username,
      email: user.email,
      countryCode: user.countryCode,
      xp: user.xp + increase,
    };

    axiosClient.put(`/users/${user.id}`, update, config).then(() => {
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

  const handleScore = () => {
    axiosClient
      .get(`/scores/${user.id}/${quiz.id}`, config)
      .then((response) => {
        if (response.status === 204) {
          createScore(user.id);
        } else if (
          score > response.data.score ||
          (score === response.data.score && time < response.data.time)
        ) {
          updateScore(response.data);
        }
      });
  };

  const createScore = () => {
    axiosClient
      .post(
        `/scores`,
        {
          userId: user.id,
          quizId: quiz.id,
          score: score,
          time: time,
        },
        config
      )
      .then(() => {
        toast(scoreSubmitted(toastPosition));
      });
  };

  const updateScore = (existing) => {
    axiosClient
      .put(
        `/scores/${existing.id}`,
        {
          userId: existing.userId,
          quizId: quiz.id,
          score: score,
          time: time,
        },
        config
      )
      .then(() => {
        toast(scoreSubmitted(toastPosition));
      });
  };

  const getLeaderboardEntry = () => {
    axiosClient.get(`/leaderboard/${quiz.id}/${user.id}`).then((response) => {
      if (response.status !== 200) {
        setIsLoading(false);
        return;
      }

      setEntry(response.data);
      setIsLoading(false);
    });
  };

  const handleSubmitEntry = (existingEntry) => {
    setIsSubmitting(true);
    if (existingEntry) {
      updateEntry(existingEntry);
    } else {
      createEntry();
    }
    setLeaderboardEntrySubmitted(true);
  };

  const handleRedirectWithScore = (pathname) => {
    const tempScore = { score, time };
    axiosClient.post("/tempscores", tempScore).then((response) => {
      router.push({
        pathname: pathname,
        query: {
          data: JSON.stringify({
            redirect: `/quiz/${quiz.route}`,
            tempScoreId: response.data,
          }),
        },
      });
    });
  };

  const createEntry = () => {
    axiosClient
      .post(
        `/leaderboard`,
        {
          quizId: quiz.id,
          userId: user.id,
          score: score,
          time: time,
        },
        config
      )
      .then(() => {
        setIsSubmitting(false);
        onClose();
        entrySubmitted();
      });
  };

  const updateEntry = (existingEntry) => {
    axiosClient
      .put(
        `/leaderboard/${existingEntry.id}`,
        {
          quizId: existingEntry.quizId,
          userId: existingEntry.userId,
          score: score,
          time: time,
        },
        config
      )
      .then(() => {
        setIsSubmitting(false);
        onClose();
        toast(entrySubmitted(toastPosition));
      });
  };

  return (
    <GameOverModal
      quiz={quiz}
      score={score}
      time={time}
      existingEntry={entry}
      isLoggedIn={!!user}
      isLoading={isLoading}
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={quiz.hasLeaderboard ? handleSubmitEntry : null}
      onRedirectWithScore={handleRedirectWithScore}
    />
  );
};

GameOverModalContainer.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.number,
    name: PropTypes.string,
    maxScore: PropTypes.number,
    time: PropTypes.number,
    mapSVG: PropTypes.string,
    imageUrl: PropTypes.string,
    verb: PropTypes.string,
    apiPath: PropTypes.string,
    route: PropTypes.string,
    hasLeaderboard: PropTypes.bool,
    hasGrouping: PropTypes.bool,
    hasFlags: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
  score: PropTypes.number,
  time: PropTypes.number,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isScoreSubmitted: PropTypes.bool,
  setScoreSubmitted: PropTypes.func,
  setLeaderboardEntrySubmitted: PropTypes.func,
  onRedirectWithScore: PropTypes.func,
};

GameOverModalContainer.defaultProps = {
  quiz: {},
  score: 0,
  time: 0,
  isOpen: false,
  onClose: () => {},
  isScoreSubmitted: false,
  setScoreSubmitted: () => {},
  setLeaderboardEntrySubmitted: () => {},
  onRedirectWithScore: () => {},
};

export default GameOverModalContainer;
