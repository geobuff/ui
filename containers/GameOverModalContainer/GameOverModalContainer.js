import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

import GameOverModal from "../../components/GameOverModal";
import { getApiPath, isScoreOnly } from "../../helpers/quizzes";
import { fetcher } from "../../helpers/fetcher";

const GameOverModalContainer = ({ quiz, score, time, isOpen, onClose }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [entry, setEntry] = useState();
  const [loading, setLoading] = useState(true);
  const [scoreOnly, setScoreOnly] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    if (isScoreOnly(quiz)) {
      setScoreOnly(true);
      setLoading(false);
      return;
    }

    getAccessTokenSilently({
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    }).then((token) => {
      const decoded = jwt_decode(token);
      const username = decoded[process.env.NEXT_PUBLIC_AUTH0_USERNAME_KEY];
      fetcher(`${process.env.NEXT_PUBLIC_API_URL}/users/id/${username}`).then(
        (userId) => {
          fetcher(
            `${process.env.NEXT_PUBLIC_API_URL}/${getApiPath(
              quiz
            )}/leaderboard/${userId}`
          )
            .then((entry) => {
              setEntry(entry);
              setLoading(false);
            })
            .catch(() => {
              // No existing leaderboard entry for user.
              return;
            });
        }
      );
    });
  }, [getAccessTokenSilently]);

  const submitEntry = (existingEntry) => {
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
          time: 150,
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
      time: 150,
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
      scoreOnly={scoreOnly}
      existingEntry={entry}
      isOpen={isOpen}
      onClose={onClose}
      submitEntry={submitEntry}
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
