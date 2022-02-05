import React, { FC, useContext, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminTopFiveQuizPlays from "../../components/AdminTopFiveQuizPlays";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { getQuizPlaysData } from "../../helpers/charts";
import AdminTopFiveQuizPlaysPlaceholder from "../../placeholders/AdminTopFiveQuizPlaysPlaceholder";

const AdminTopFiveQuizPlaysContainer: FC = () => {
  const { getAuthConfig } = useContext(CurrentUserContext);
  const [quizPlays, setQuizPlays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/quiz-plays-top-five", getAuthConfig())
      .then((response) => {
        setQuizPlays(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [getAuthConfig]);

  if (isLoading) {
    return <AdminTopFiveQuizPlaysPlaceholder />;
  }

  return <AdminTopFiveQuizPlays data={getQuizPlaysData(quizPlays)} />;
};

export default AdminTopFiveQuizPlaysContainer;
