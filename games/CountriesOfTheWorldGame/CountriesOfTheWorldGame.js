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

const snapPoints = [600, 400, 200, 200];
const initialSnap = snapPoints.length - 1;

const CountriesOfTheWorldGame = () => {
  const shouldDiaplyOnMobile = useBreakpointValue({ base: true, lg: false });
  const [isOpen, setIsOpen] = useState(true);

  // Because we want the modal to stay open, this forces the
  // modal to stay open even if it's forced closed by pesky users
  const handleClose = () => {
    setIsOpen(false);
    setIsOpen(true);
  };

  return (
    <Box width="100%" height="100vh" backgroundColor="#276F86">
      <Flex>
        {!shouldDiaplyOnMobile && <Sidebar heading="Countries of the World" />}

        <Box width="100%">
          <Box pt={2} textAlign="center">
            <SVGMap
              map={World}
              className="countries-of-world"
              locationClassName="highlight-on-hover"
            />
          </Box>

          {shouldDiaplyOnMobile && (
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
