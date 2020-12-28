import React from "react";
import { useRouter } from "next/router";

import CountriesOfTheWorldGame from "../../games/CountriesOfTheWorldGame";

const Quiz = () => {
  const router = useRouter();
  const { id } = router.query;

  switch (id) {
    case "countries-of-the-world":
      return <CountriesOfTheWorldGame />;

    default:
      return null;
  }
};

export default Quiz;
