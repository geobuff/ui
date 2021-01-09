import React, { useState } from "react";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/core";

import { SVGMap } from "react-svg-map";
import World from "@svg-maps/world";

import CountryResultsList from "../.../../../components/CountryResultsList";
import GameBottomSheetModal from "../../components/GameBottomSheetModal";
import GameInputBanner from "../../components/GameInputBanner";
import GameInputCard from "../../components/GameInputCard";
import Sidebar from "../../components/Sidebar";

import { allCountries } from "../../helpers/countries";

const recentCountries = [
  {
    code: "NZ",
    svgName: "New Zealand",
  },
  {
    code: "BR",
    svgName: "Brasil",
  },
  {
    code: "FR",
    svgName: "France",
  },
];

const timeFifteenMinutes = () =>
  new Date().setMinutes(new Date().getMinutes() + 15);

const CountriesOfTheWorldGame = () => {
  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });

  const [countries, setCountries] = useState(() => allCountries);

  const [timeRemaining, setTimeRemaining] = useState(new Date().getMinutes());

  const [hasGameStarted, setHasGameStarted] = useState(false);

  const [score, setScore] = useState(0);

  console.log(countries, "countries");

  const getLocationClassName = (location) => {
    const checkedCountries = countries.filter((country) => country.checked);
    // TODO: km - move out of here!!
    setScore(checkedCountries.length);
    if (checkedCountries?.find((country) => country.name === location.name)) {
      return `selected`;
    }
  };

  const handleChange = (event) => {
    const { value } = event.currentTarget;

    const updatedCountries = countries.map((country) => {
      if (country.name === value) {
        return {
          ...country,
          checked: true,
        };
      } else {
        return country;
      }
    });

    setCountries(updatedCountries);
  };

  const handleGameStart = () => {
    setTimeRemaining(timeFifteenMinutes());
    setHasGameStarted(true);
    setScore(0);
  };

  const handleGameStop = () => {
    setTimeRemaining(null);
    setHasGameStarted(false);
  };

  return (
    <Box width="100%" height="100vh" backgroundColor="#276F86">
      {shouldDisplayOnMobile && (
        <GameInputBanner
          expiryTimestamp={timeRemaining}
          score={score}
          total={193}
          verb="countries"
        />
      )}

      <Flex>
        {!shouldDisplayOnMobile && (
          <Box height="100%">
            <Sidebar heading="Countries of the World Quiz">
              <Box>
                <GameInputCard
                  hasGameStarted={hasGameStarted}
                  timeRemaining={timeRemaining}
                  countries={recentCountries}
                  onChange={handleChange}
                  onGameStart={handleGameStart}
                  onGameStop={handleGameStop}
                  score={score}
                  total={193}
                />
                <CountryResultsList />
              </Box>
            </Sidebar>
          </Box>
        )}

        <Box width="100%">
          <Box pt={2} textAlign="center">
            <SVGMap
              map={World}
              className="countries-of-world"
              // locationClassName="highlight-on-hover"
              locationClassName={getLocationClassName}
            />
          </Box>

          {shouldDisplayOnMobile && (
            <GameBottomSheetModal
              hasGameStarted={hasGameStarted}
              recentCountries={recentCountries}
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default CountriesOfTheWorldGame;
