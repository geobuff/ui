import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import { useToast } from "@chakra-ui/react";

import useCurrentUser from "../../hooks/UseCurrentUser";
import GameOverModal from "../../components/GameOverModal";
import { getLevel } from "../../helpers/gamification";

const GameOverModalContainer = ({ quiz, score, time, isOpen, onClose }) => {
  const toast = useToast();

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { user } = useCurrentUser();

  const [entry, setEntry] = useState();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setLoading(true);
      return;
    }

    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    }).then((token) => {
      increaseXP(token, 10);
      handleScore(token);
      if (!quiz.hasLeaderboard) {
        setLoading(false);
      } else {
        getLeaderboardEntry(user.id);
      }
    });
  }, [isOpen, getAccessTokenSilently]);

  const increaseXP = (token, increase) => {
    const update = {
      id: user.id,
      username: user.username,
      countryCode: user.countryCode,
      xp: user.xp + increase,
    };

    const params = {
      method: "PUT",
      body: JSON.stringify(update),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, params)
      .then((response) => response.json())
      .then(() => {
        toast({
          description: `+${increase} XP`,
          status: "info",
          duration: 9000,
          isClosable: true,
        });

        const newLevel = getLevel(update.xp);
        if (newLevel > getLevel(user.xp)) {
          toast({
            title: "Congratulations!",
            description: `You've reached level ${newLevel}.`,
            status: "info",
            duration: 9000,
            isClosable: true,
          });
        }
      });
  };

  const handleScore = (token) => {
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/scores/${user.id}/${quiz.id}`,
      params
    ).then((response) => {
      if (response.status === 204) {
        createScore(token, user.id);
      } else {
        response.json().then((existing) => {
          if (
            score > existing.score ||
            (score === existing.score && time < existing.time)
          ) {
            updateScore(token, existing);
          }
        });
      }
    });
  };

  const createScore = (token) => {
    const result = {
      userId: user.id,
      quizId: quiz.id,
      score: score,
      time: time,
    };

    const params = {
      method: "POST",
      body: JSON.stringify(result),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/scores`, params)
      .then((response) => response.json())
      .then(() => {
        scoreSubmitted();
      });
  };

  const updateScore = (token, existing) => {
    const update = {
      userId: existing.userId,
      quizId: quiz.id,
      score: score,
      time: time,
    };

    const params = {
      method: "PUT",
      body: JSON.stringify(update),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/scores/${existing.id}`, params)
      .then((response) => response.json())
      .then(() => {
        scoreSubmitted();
      });
  };

  const scoreSubmitted = () => {
    toast({
      title: "Score Submitted",
      description: "We've updated your high score for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const getLeaderboardEntry = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${quiz.apiPath}/leaderboard/${user.id}`
    ).then((response) => {
      if (response.status !== 200) {
        setLoading(false);
        return;
      }

      response.json().then((entry) => {
        setEntry(entry);
        setLoading(false);
      });
    });
  };

  const handleSubmitEntry = (existingEntry) => {
    setSubmitting(true);
    getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    }).then((token) => {
      if (existingEntry) {
        updateEntry(token, existingEntry);
      } else {
        createEntry(token);
      }
    });
  };

  const createEntry = (token) => {
    const entry = {
      userId: user.id,
      countryCode: "US",
      score: score,
      time: time,
    };

    const params = {
      method: "POST",
      body: JSON.stringify(entry),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${quiz.apiPath}/leaderboard`,
      params
    )
      .then((response) => response.json())
      .then(() => {
        setSubmitting(false);
        onClose();
        entrySubmitted();
      });
  };

  const updateEntry = (token, existingEntry) => {
    const entry = {
      userId: existingEntry.userId,
      countryCode: existingEntry.countryCode,
      score: score,
      time: time,
    };

    const params = {
      method: "PUT",
      body: JSON.stringify(entry),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${quiz.apiPath}/leaderboard/${existingEntry.id}`,
      params
    )
      .then((response) => response.json())
      .then(() => {
        setSubmitting(false);
        onClose();
        entrySubmitted();
      });
  };

  const entrySubmitted = () => {
    toast({
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
      loggedIn={isAuthenticated}
      existingEntry={entry}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={quiz.hasLeaderboard && handleSubmitEntry}
      submitting={submitting}
    />
  );
};

GameOverModalContainer.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxScore: PropTypes.number,
    imageUrl: PropTypes.string,
    verb: PropTypes.string,
    apiPath: PropTypes.string,
    hasLeaderboard: PropTypes.bool,
    enabled: PropTypes.bool,
  }),
  score: PropTypes.number,
  time: PropTypes.number,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  setScoreSubmitted: PropTypes.func,
  setLeaderboardEntrySubmitted: PropTypes.func,
};

export default GameOverModalContainer;
