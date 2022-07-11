import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import GameSpinner from "../../components/GameSpinner";
import { DateTime } from "luxon";

const Today: FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/daily-trivia/${DateTime.now().toFormat("yyyy-MM-dd")}`);
  }, []);

  return <GameSpinner />;
};

export default Today;
