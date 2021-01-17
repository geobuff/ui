import React from "react";
import { useRouter } from "next/router";

import CountriesOfTheWorldGameContainer from "../../containers/CountriesOfTheWorldGameContainer";

const Quiz = () => {
  const router = useRouter();
  const { id } = router.query;

  switch (id) {
    case "countries-of-the-world":
      return <CountriesOfTheWorldGameContainer />;

    default:
      return null;
  }
};

export default Quiz;
