import React, { useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/core";

import { SVGMap } from "react-svg-map";
import World from "@svg-maps/world";
import Sheet from "react-modal-sheet";

import Sidebar from "../../components/Sidebar";
import CountryResultsList from "../.../../../components/CountryResultsList";
import GameInputBanner from "../../components/GameInputBanner";
import GameInputCard from "../../components/GameInputCard";

const snapPoints = [600, 400, 200, 200];
const initialSnap = snapPoints.length - 1;

const recentCountries = [
  {
    code: "NZ",
    name: "New Zealand",
  },
  {
    code: "BR",
    name: "Brasil",
  },
  {
    code: "FR",
    name: "France",
  },
];

const CountriesOfTheWorldGame = () => {
  const fifteenMinutes = new Date();
  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });
  const [isOpen, setIsOpen] = useState(true);
  const [timeRemaining] = useState(() =>
    fifteenMinutes.setMinutes(fifteenMinutes.getMinutes() + 15)
  );

  // Because we want the modal to stay open, this forces the
  // modal to stay open even if it's forced closed by pesky users
  const handleClose = () => {
    setIsOpen(false);
    setIsOpen(true);
  };

  return (
    <Box width="100%" height="100vh" backgroundColor="#276F86">
      {shouldDisplayOnMobile && (
        <GameInputBanner score={69} total={193} verb="countries" />
      )}

      <Flex>
        {!shouldDisplayOnMobile && (
          <Box height="100%">
            <Sidebar heading="Countries of the World Quiz">
              <Box>
                <GameInputCard
                  timeRemaining={timeRemaining}
                  countries={recentCountries}
                  score={69}
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
              locationClassName="highlight-on-hover"
            />
          </Box>

          {shouldDisplayOnMobile && (
            <Box
              as={Sheet}
              isOpen={isOpen}
              onClose={handleClose}
              snapPoints={snapPoints}
              initialSnap={initialSnap}
              mt={11}
            >
              <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                  <Box m={5} textAlign="center">
                    <Heading size="lg" pt={0}>
                      {"Countries of the World Quiz"}
                    </Heading>
                    <Divider my={5} />
                    <Box>
                      <CountryResultsList />
                    </Box>
                  </Box>
                </Sheet.Content>
              </Sheet.Container>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default CountriesOfTheWorldGame;
