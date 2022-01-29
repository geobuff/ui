import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminLastFiveTriviaPlays from "../../components/AdminLastFiveTrivaPlays";
import { CurrentUserContext } from "../../context/CurrentUserContext";

const AdminLastFiveTriviaPlaysContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);
  const [triviaPlays, setTriviaPlays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/trivia-plays/last-five", getAuthConfig())
      .then((response) => {
        setTriviaPlays(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [getAuthConfig]);

  if (isLoading) {
    return null;
  }

  return <AdminLastFiveTriviaPlays triviaPlays={triviaPlays} />;
};

export default AdminLastFiveTriviaPlaysContainer;
