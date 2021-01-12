import React, { useState } from "react";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/core";

import { SVGMap } from "react-svg-map";
import World from "@svg-maps/world";

import CountryResultsListContainer from "../.../../../components/CountryResultsListContainer";
import GameBottomSheetModal from "../../components/GameBottomSheetModal";
import GameInputBanner from "../../components/GameInputBanner";
import GameInputCard from "../../components/GameInputCard";
import Sidebar from "../../components/Sidebar";

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

const CountriesOfTheWorldGame = () => {
  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });
  const [timeRemaining] = useState(() =>
    new Date().setMinutes(new Date().getMinutes() + 15)
  );

  const hasGameStarted = true;

  return (
    <Box width="100%" height="100vh" backgroundColor="#276F86">
      {shouldDisplayOnMobile && (
        <GameInputBanner
          expiryTimestamp={timeRemaining}
          score={69}
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
                  hasGameStarted={true}
                  timeRemaining={timeRemaining}
                  countries={recentCountries}
                  score={69}
                  total={193}
                />
                <CountryResultsListContainer />
              </Box>
            </Sidebar>
          </Box>
        )}

        <Box width="100%">
          <Box pt={2} textAlign="center">
            <SVGMap
              map={World}
              className="countries-of-world"
              locationClassName="highlight-on-hover"
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
