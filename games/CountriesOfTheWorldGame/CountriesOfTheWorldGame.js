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

const snapPoints = [600, 400, 200, 200];
const initialSnap = snapPoints.length - 1;

const CountriesOfTheWorldGame = () => {
  // TODO: km - rename
  const shouldShowSheet = useBreakpointValue({ base: true, lg: false });
  const [isOpen, setIsOpen] = useState(true);

  // Because we want the modal to stay open, this forces the
  // modal to stay open even if it's forced closed by pesky users
  const handleClose = () => {
    setIsOpen(false);
    setIsOpen(true);
  };

  return (
    <Box width="100%" height="100vh" backgroundColor="#F5F5F5">
      <Flex>
        {!shouldShowSheet && (
          <Box p={4} width="375px" height="100vh" backgroundColor="#FFF">
            <Heading mt={2} size="md" textAlign="center">
              {"Countries of the World Quiz"}
            </Heading>
            <Divider my={5} />
          </Box>
        )}

        <Box width="100%">
          <Box width="100%" pt={2} textAlign="center">
            <SVGMap
              map={World}
              className="countries-of-world"
              locationClassName="highlight-on-hover"
            />
          </Box>

          {shouldShowSheet && (
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
                    <Heading size="lg" mt={0} mb={6}>
                      {"Countries of the World Quiz"}
                    </Heading>
                    <Divider />
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
