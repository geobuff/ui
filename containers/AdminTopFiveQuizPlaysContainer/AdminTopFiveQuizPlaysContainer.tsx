import React, { FC, useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import AdminTopFiveQuizPlays from "../../components/AdminTopFiveQuizPlays";

import axiosClient from "../../axios";
import { getQuizPlaysData } from "../../helpers/charts";
import AdminTopFiveQuizPlaysPlaceholder from "../../placeholders/AdminTopFiveQuizPlaysPlaceholder";

const AdminTopFiveQuizPlaysContainer: FC = () => {
  const { data: session, status } = useSession();

  const [quizPlays, setQuizPlays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      axiosClient
        .get("/quiz-plays-top-five", session?.authConfig)
        .then((response) => {
          setQuizPlays(response.data);
        })
        .finally(() => setIsLoading(false));
    }
  }, [status, session]);

  if (isLoading) {
    return <AdminTopFiveQuizPlaysPlaceholder />;
  }

  return <AdminTopFiveQuizPlays data={getQuizPlaysData(quizPlays)} />;
};

export default AdminTopFiveQuizPlaysContainer;
