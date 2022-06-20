import { useSession } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminLastWeekTriviaPlays from "../../components/AdminLastWeekTriviaPlays";
import { getTriviaPlaysData } from "../../helpers/charts";
import AdminLastWeekTriviaPlaysPlaceholder from "../../placeholders/AdminLastWeekTriviaPlaysPlaceholder";
import { AuthUser } from "../../types/auth-user";

const AdminLastWeekTriviaPlaysContainer: FC = () => {
  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const [triviaPlays, setTriviaPlays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/trivia-plays/week", user?.authConfig)
      .then((response) => {
        setTriviaPlays(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [user]);

  if (isLoading) {
    return <AdminLastWeekTriviaPlaysPlaceholder />;
  }

  return <AdminLastWeekTriviaPlays data={getTriviaPlaysData(triviaPlays)} />;
};

export default AdminLastWeekTriviaPlaysContainer;
