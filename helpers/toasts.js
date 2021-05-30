const defaultPosition = "bottom-right";

export const entrySubmitted = (position = defaultPosition) => ({
  position: position,
  title: "Leaderboard Entry Submitted",
  description: "Your leaderboard entry was submitted successfully.",
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const scoreSubmitted = (position = defaultPosition) => ({
  position: position,
  title: "Score Submitted",
  description: "We've updated your high score for you.",
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const increaseXP = (increase, position = defaultPosition) => ({
  position: position,
  description: `+${increase} XP`,
  status: "info",
  duration: 9000,
  isClosable: true,
});

export const levelUp = (newLevel, position = defaultPosition) => ({
  position: position,
  title: "Congratulations!",
  description: `You've reached level ${newLevel}.`,
  status: "info",
  duration: 9000,
  isClosable: true,
});
