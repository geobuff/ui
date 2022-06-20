import { useSession } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";
import axiosClient from "../../axios";
import AdminTopFiveQuizPlays from "../../components/AdminTopFiveQuizPlays";
import { getQuizPlaysData } from "../../helpers/charts";
import AdminTopFiveQuizPlaysPlaceholder from "../../placeholders/AdminTopFiveQuizPlaysPlaceholder";
import { AuthUser } from "../../types/auth-user";

const AdminTopFiveQuizPlaysContainer: FC = () => {
  const { data: session } = useSession();
  const user = session?.user as AuthUser;

  const [quizPlays, setQuizPlays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/quiz-plays-top-five", user?.authConfig)
      .then((response) => {
        setQuizPlays(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [user]);

  if (isLoading) {
    return <AdminTopFiveQuizPlaysPlaceholder />;
  }

  return <AdminTopFiveQuizPlays data={getQuizPlaysData(quizPlays)} />;
};

export default AdminTopFiveQuizPlaysContainer;
