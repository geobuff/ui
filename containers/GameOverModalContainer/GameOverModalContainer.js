import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

import GameOverModal from "../../components/GameOverModal";
import { getApiPath } from "../../helpers/quizzes";
import { fetcher } from "../../helpers/fetcher";

const GameOverModalContainer = ({ quiz, score, time, isOpen, onClose }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [entry, setEntry] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
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
