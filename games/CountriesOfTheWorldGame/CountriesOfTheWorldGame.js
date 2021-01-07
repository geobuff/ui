import React, { useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/core";

import { SVGMap } from "react-svg-map";
import World from "@svg-maps/world";
import Sheet from "react-modal-sheet";

import CountryList from "../.../../../components/CountryList";
import CountryResultsList from "../.../../../components/CountryResultsList";
import GameInputBanner from "../../components/GameInputBanner";
import GameInputCard from "../../components/GameInputCard";
import Sidebar from "../../components/Sidebar";

const snapPoints = [600, 400, 300, 100];
const initialSnap = snapPoints.length - 2;

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
  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });
  const [isOpen, setIsOpen] = useState(true);
  const [timeRemaining] = useState(() =>
    new Date().setMinutes(new Date().getMinutes() + 15)
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
                  <Box mx={5} my={0}>
                    <Box>
                      <Heading pt={0} size="md" textAlign="center">
                        {"Countries of the World Quiz"}
                      </Heading>

                      <Divider my={4} />
                    </Box>

                    <Box mt={4} overflowY="scroll">
                      <Text fontWeight="bold" mb={1}>
                        {"RECENT"}
                      </Text>
                      <CountryList countries={recentCountries} />
                    </Box>

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
