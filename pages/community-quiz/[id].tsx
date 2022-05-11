import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import GameCommunityQuizContainer from "../../containers/GameCommunityQuizContainer/GameCommunityQuizContainer";

const PlayCommunityQuiz: FC = () => {
  const router = useRouter();
  const [quizId, setQuizId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.asPath !== router.route) {
      const quizId = router.query.id as string;
      setQuizId(parseInt(quizId));
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return null;
  }

  return <GameCommunityQuizContainer quizId={quizId} />;
};

export default PlayCommunityQuiz;
