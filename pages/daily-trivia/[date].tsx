import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import GameDailyTriviaContainer from "../../containers/GameDailyTriviaContainer";

const DailyTriviaQuiz: FC = () => {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.asPath !== router.route) {
      const date = router.query.date as string;
      setDate(date);
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return null;
  }

  return <GameDailyTriviaContainer date={date} />;
};

export default DailyTriviaQuiz;
