import React from "react";
import PropTypes from "prop-types";

import GameOverModal from "../../components/GameOverModal";

const GameOverModalContainer = ({ isOpen, onClose }) => {
  return (
    <GameOverModal
      existingEntry={{ rank: 1, score: 100, time: 100, countryCode: "US" }}
      total={100}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

GameOverModalContainer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default GameOverModalContainer;
