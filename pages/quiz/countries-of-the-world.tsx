import React, { FC } from "react";
import { WorldCountries } from "@geobuff/svg-maps";

import MainView from "../../components/MainView";
import GameMapQuiz from "../../components/GameMapQuiz";

interface Props {
  [x: string]: any;
}

const Quiz: FC<Props> = ({ pageProps }) => {
  // TODO: remove quiz and replace with hardcoded props
  const quiz = pageProps.quiz;
  const mapping = pageProps.mapping;
  return (
    <MainView hasFooter={false} backgroundColor="#276F86">
      <GameMapQuiz
        time={quiz?.time}
        name={quiz?.name}
        type={quiz?.type}
        maxScore={quiz?.maxScore}
        verb={quiz?.verb}
        route={quiz?.route}
        id={quiz?.id || "1"}
        mapping={mapping || []}
        map={WorldCountries}
        hasLeaderboard
        hasFlags
        hasGrouping
      />
    </MainView>
  );
};

export async function getStaticProps() {
  const quizRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/1`);
  const mappingRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mappings/world-countries`
  );

  const quiz = await quizRes.json();
  const mapping = await mappingRes.json();

  if (!quiz && mapping) {
    return {
      notFound: true,
    };
  }

  return {
    props: { quiz, mapping },
  };
}

export default Quiz;
