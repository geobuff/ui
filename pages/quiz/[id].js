import React from "react";
import { useRouter } from "next/router";

import CountriesOfTheWorldGameContainer from "../../containers/CountriesOfTheWorldGameContainer";
import CapitalsOfTheWorldGameContainer from "../../containers/CapitalsOfTheWorldGameContainer";
import USStatesGameContainer from "../../containers/USStatesGameContainer";
import UKCountiesGameContainer from "../../containers/UKCountiesGameContainer";
import { Quizzes } from "../../helpers/quizzes";

const Quiz = () => {
  const router = useRouter();
  const { id } = router.query;

  switch (id) {
    case "countries-of-the-world":
      return (
        <CountriesOfTheWorldGameContainer id={Quizzes.CountriesOfTheWorld} />
      );
    case "capitals-of-the-world":
      return (
        <CapitalsOfTheWorldGameContainer id={Quizzes.CapitalsOfTheWorld} />
      );
    case "us-states":
      return <USStatesGameContainer id={Quizzes.USStates} />;
    case "uk-counties":
      return <UKCountiesGameContainer id={Quizzes.UKCounties} />;
    default:
      return null;
  }
};

export default Quiz;
