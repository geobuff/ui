import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

import GameOverModal from "../../components/GameOverModal";
import { getApiPath, isScoreOnly } from "../../helpers/quizzes";

const GameOverModalContainer = ({ quiz, score, time, isOpen, onClose }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [entry, setEntry] = useState();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

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
      const decoded = jwt_decode(token);
      const username = decoded[process.env.NEXT_PUBLIC_AUTH0_USERNAME_KEY];
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/id/${username}`)
        .then((response) => response.json())
        .then((userId) => {
          handleScore(token, userId);
          if (isScoreOnly(quiz)) {
            setLoading(false);
            return;
          }

          getLeaderboardEntry(userId);
        });
    });
  }, [isOpen, getAccessTokenSilently]);

  const handleScore = (token, userId) => {
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/scores/${userId}/${quiz}`,
      params
    ).then((response) => {
      if (response.status === 404) {
        createScore(token, userId);
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

  const createScore = (token, userId) => {
    const result = {
      userId: userId,
      quizId: quiz,
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

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/scores`, params);
  };

  const updateScore = (token, existing) => {
    const update = {
      userId: existing.userId,
      quizId: quiz,
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

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/scores/${existing.id}`, params);
  };

  const getLeaderboardEntry = (userId) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${getApiPath(
        quiz
      )}/leaderboard/${userId}`
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
    const decoded = jwt_decode(token);
    const username = decoded[process.env.NEXT_PUBLIC_AUTH0_USERNAME_KEY];
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/id/${username}`)
      .then((response) => response.json())
      .then((userId) => {
        const entry = {
          userId: userId,
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
          `${process.env.NEXT_PUBLIC_API_URL}/${getApiPath(quiz)}/leaderboard`,
          params
        )
          .then((response) => response.json())
          .then(() => {
            setSubmitting(false);
            onClose();
          })
          .catch((error) => {
            setError(error.message);
            setSubmitting(false);
          });
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
      `${process.env.NEXT_PUBLIC_API_URL}/${getApiPath(quiz)}/leaderboard/${
        existingEntry.id
      }`,
      params
    )
      .then((response) => response.json())
      .then(() => {
        setSubmitting(false);
        onClose();
      })
      .catch((error) => {
        setError(error.message);
        setSubmitting(false);
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
      onSubmit={!isScoreOnly(quiz) && handleSubmitEntry}
      submitting={submitting}
      error={error}
    />
  );
};

GameOverModalContainer.propTypes = {
  quiz: PropTypes.number,
  score: PropTypes.number,
  time: PropTypes.number,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default GameOverModalContainer;
