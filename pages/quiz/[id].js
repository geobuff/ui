import React from "react";
import { useRouter } from "next/router";

import CountriesOfTheWorldGameContainer from "../../containers/CountriesOfTheWorldGameContainer";
import CapitalsOfTheWorldGameContainer from "../../containers/CapitalsOfTheWorldGameContainer";
import USStatesGameContainer from "../../containers/USStatesGameContainer";
import UKCountiesGameContainer from "../../containers/UKCountiesGameContainer";

const Quiz = () => {
  const router = useRouter();
  const { id } = router.query;

  switch (id) {
    case "countries-of-the-world":
      return <CountriesOfTheWorldGameContainer />;
    case "capitals-of-the-world":
      return <CapitalsOfTheWorldGameContainer />;
    case "us-states":
      return <USStatesGameContainer />;
    case "uk-counties":
      return <UKCountiesGameContainer />;
    default:
      return null;
  }
};

export default Quiz;
