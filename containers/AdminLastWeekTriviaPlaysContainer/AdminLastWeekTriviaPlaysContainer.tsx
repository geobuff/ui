import React, { FC, useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import AdminLastWeekTriviaPlays from "../../components/AdminLastWeekTriviaPlays";

import axiosClient from "../../axios";
import { getTriviaPlaysData } from "../../helpers/charts";
import AdminLastWeekTriviaPlaysPlaceholder from "../../placeholders/AdminLastWeekTriviaPlaysPlaceholder";

const AdminLastWeekTriviaPlaysContainer: FC = () => {
  const { data, status } = useSession();
  const session = data as any;

  const [triviaPlays, setTriviaPlays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      axiosClient
        .get("/trivia-plays/week", session?.authConfig)
        .then((response) => {
          setTriviaPlays(response.data);
        })
        .finally(() => setIsLoading(false));
    }
  }, [status, session]);

  if (isLoading) {
    return <AdminLastWeekTriviaPlaysPlaceholder />;
  }

  return <AdminLastWeekTriviaPlays data={getTriviaPlaysData(triviaPlays)} />;
};

export default AdminLastWeekTriviaPlaysContainer;
