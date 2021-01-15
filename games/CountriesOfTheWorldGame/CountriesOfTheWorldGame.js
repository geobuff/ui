import React, { useCallback, useState } from "react";
import { debounce } from "debounce";
import PropTypes from "prop-types";

import { Box, Flex, useBreakpointValue } from "@chakra-ui/core";

import { SVGMap } from "react-svg-map";
import World from "@svg-maps/world";

// TODO: km - move to containers folder
import CountryResultsListContainer from "../.../../../components/CountryResultsListContainer";
import GameBottomSheetModal from "../../components/GameBottomSheetModal";
import GameInputBanner from "../../components/GameInputBanner";
import GameInputCard from "../../components/GameInputCard";
import Sidebar from "../../components/Sidebar";

// import { allCountries } from "../../helpers/countries";

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

const CountriesOfTheWorldGame = ({ checkedCountries, onChange, score }) => {
  const shouldDisplayOnMobile = useBreakpointValue({ base: true, lg: false });

  const [timeRemaining, setTimeRemaining] = useState(new Date().getMinutes());

  const [hasGameStarted, setHasGameStarted] = useState(false);

  const getLocationClassName = (location) => {
    if (
      checkedCountries.length
        ? checkedCountries.find(
            (country) =>
              country.name.toLowerCase() === location.name.toLowerCase()
          )
        : false
    ) {
      return `selected`;
    }
  };

  const handleChange = (event) => {
    handleDebounceChange(event.target.value);
  };

  const handleDebounceChange = useCallback(debounce(onChange, 50), [onChange]);

  const handleGameStart = () => {
    setTimeRemaining(timeFifteenMinutes());
    setHasGameStarted(true);
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
                  // TODO: km -consider rename onChange
                  onChange={handleChange}
                  onGameStart={handleGameStart}
                  onGameStop={handleGameStop}
                  score={score}
                  total={193}
                />
                <CountryResultsListContainer
                  checkedCountries={checkedCountries}
                />
              </Box>
            </Sidebar>
          </Box>
        )}

        <Box width="100%">
          <Box pt={2} textAlign="center">
            <SVGMap
              map={World}
              className="countries-of-world"
              locationClassName={getLocationClassName}
              // locationClassName="highlight-on-hover"
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

CountriesOfTheWorldGame.propTypes = {
  checkedCountries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    })
  ),
  countriesByContinent: PropTypes.object,
  onChange: PropTypes.func,
  score: PropTypes.number,
};

CountriesOfTheWorldGame.defaultProps = {
  checkedCountries: [],
  countries: [],
  countriesByContinent: [],
  onChange: () => {},
  score: 0,
};

export default CountriesOfTheWorldGame;
