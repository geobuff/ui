import React from "react";
import { useRouter } from "next/router";

import { Text } from "@chakra-ui/core";
import CountriesOfTheWorldGame from "../../games/CountriesOfTheWorldGame/CountriesOfTheWorldGame";

const Quiz = () => {
  const router = useRouter();
  const { id } = router.query;

  switch (id) {
    case "countries-of-the-world":
      return <CountriesOfTheWorldGame />;

    default:
      return <Text>{"TODO: add/redirect 404 page"}</Text>;
  }
};

export default Quiz;
