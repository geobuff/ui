import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import GameTriviaContainer from "../../containers/GameTriviaContainer";

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

  return <GameTriviaContainer date={date} />;
};

export default DailyTriviaQuiz;
