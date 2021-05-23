import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";

import useCurrentUser from "../../hooks/UseCurrentUser";
import GameOverModal from "../../components/GameOverModal";
import { getLevel } from "../../helpers/gamification";
import axiosClient from "../../axios/axiosClient";

const GameOverModalContainer = ({
  quiz,
  score,
  time,
  isOpen,
  onClose,
  scoreSubmitted,
  setScoreSubmitted,
  setLeaderboardEntrySubmitted,
}) => {
  const toast = useToast();
  const { user, isLoading: isUserLoading, updateUser } = useCurrentUser();

  const [config, setConfig] = useState(null);
  const [entry, setEntry] = useState();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
      setLoading(true);
      return;
    }

    if (isUserLoading) {
      return;
    }

    if (!user || score === 0) {
      setLoading(false);
      return;
    }

    if (!scoreSubmitted) {
      increaseXP(10);
      handleScore();
      setScoreSubmitted(true);
    }

    if (!quiz.hasLeaderboard) {
      setLoading(false);
    } else {
      getLeaderboardEntry(user.id);
    }
  }, [isOpen, isUserLoading, user]);

  const increaseXP = (increase) => {
    const update = {
      username: user.username,
      email: user.email,
      countryCode: user.countryCode,
      xp: user.xp + increase,
    };

    axiosClient.put(`/users/${user.id}`, update, config).then(() => {
      toast({
        position: "bottom-right",
        description: `+${increase} XP`,
        status: "info",
        duration: 9000,
        isClosable: true,
      });

      const newLevel = getLevel(update.xp);
      if (newLevel > getLevel(user.xp)) {
        toast({
          position: "bottom-right",
          title: "Congratulations!",
          description: `You've reached level ${newLevel}.`,
          status: "info",
          duration: 9000,
          isClosable: true,
        });
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
    const result = {
      userId: user.id,
      quizId: quiz.id,
      score: score,
      time: time,
    };

    axiosClient.post(`/scores`, result, config).then(() => {
      scoreSubmittedToast();
    });
  };

  const updateScore = (existing) => {
    const update = {
      userId: existing.userId,
      quizId: quiz.id,
      score: score,
      time: time,
    };

    axiosClient.put(`/scores/${existing.id}`, update, config).then(() => {
      scoreSubmittedToast();
    });
  };

  const scoreSubmittedToast = () => {
    toast({
      position: "bottom-right",
      title: "Score Submitted",
      description: "We've updated your high score for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const getLeaderboardEntry = () => {
    axiosClient.get(`/leaderboard/${quiz.id}/${user.id}`).then((response) => {
      if (response.status !== 200) {
        setLoading(false);
        return;
      }

      setEntry(response.data);
      setLoading(false);
    });
  };

  const handleSubmitEntry = (existingEntry) => {
    setSubmitting(true);
    if (existingEntry) {
      updateEntry(existingEntry);
    } else {
      createEntry();
    }
    setLeaderboardEntrySubmitted(true);
  };

  const createEntry = () => {
    const entry = {
      quizId: quiz.id,
      userId: user.id,
      score: score,
      time: time,
    };

    axiosClient.post(`/leaderboard`, entry, config).then(() => {
      setSubmitting(false);
      onClose();
      entrySubmitted();
    });
  };

  const updateEntry = (existingEntry) => {
    const entry = {
      quizId: existingEntry.quizId,
      userId: existingEntry.userId,
      score: score,
      time: time,
    };

    axiosClient
      .put(`/leaderboard/${existingEntry.id}`, entry, config)
      .then(() => {
        setSubmitting(false);
        onClose();
        entrySubmitted();
      });
  };

  const entrySubmitted = () => {
    toast({
      position: "bottom-right",
      title: "Leaderboard Entry Submitted",
      description: "Your leaderboard entry was submitted successfully.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  if (loading) {
    return null;
  }

  return (
    <GameOverModal
      quiz={quiz}
      score={score}
      time={time}
      loggedIn={!!user}
      existingEntry={entry}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={quiz.hasLeaderboard ? handleSubmitEntry : null}
      submitting={submitting}
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
  scoreSubmitted: PropTypes.bool,
  setScoreSubmitted: PropTypes.func,
  setLeaderboardEntrySubmitted: PropTypes.func,
};

export default GameOverModalContainer;
