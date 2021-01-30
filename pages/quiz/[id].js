import React from "react";
import { useRouter } from "next/router";

import CountriesOfTheWorldGameContainer from "../../containers/CountriesOfTheWorldGameContainer";
import CapitalsOfTheWorldGameContainer from "../../containers/CapitalsOfTheWorldGameContainer";

const Quiz = () => {
  const router = useRouter();
  const { id } = router.query;

  switch (id) {
    case "countries-of-the-world":
      return <CountriesOfTheWorldGameContainer />;
    case "capitals-of-the-world":
      return <CapitalsOfTheWorldGameContainer />;
    default:
      return null;
  }
};

export default Quiz;
