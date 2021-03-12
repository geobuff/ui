import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import LeaderboardContainer from "../containers/LeaderboardContainer";

const Leaderboard = () => {
  const router = useRouter();
  const { quizId } = router.query;

  const [quiz, setQuiz] = useState(0);

  useEffect(() => {
    if (quizId !== undefined) {
      setQuiz(parseInt(quizId));
    }
  }, [quizId]);

  return <LeaderboardContainer quizId={quiz} />;
};

export default Leaderboard;
