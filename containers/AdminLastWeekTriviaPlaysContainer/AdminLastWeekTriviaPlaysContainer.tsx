import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminLastWeekTriviaPlays from "../../components/AdminLastWeekTriviaPlays";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { getTriviaPlaysData } from "../../helpers/charts";
import AdminLastWeekTriviaPlaysPlaceholder from "../../placeholders/AdminLastWeekTriviaPlaysPlaceholder";

const AdminLastWeekTriviaPlaysContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);
  const [triviaPlays, setTriviaPlays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/trivia-plays/week", getAuthConfig())
      .then((response) => {
        setTriviaPlays(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [getAuthConfig]);

  if (isLoading) {
    return <AdminLastWeekTriviaPlaysPlaceholder />;
  }

  return <AdminLastWeekTriviaPlays data={getTriviaPlaysData(triviaPlays)} />;
};

export default AdminLastWeekTriviaPlaysContainer;
