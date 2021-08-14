const defaultPosition = "bottom-right";

export const entrySubmitted = (position = defaultPosition) => ({
  position: position,
  title: "Leaderboard Entry Submitted",
  description: "Your leaderboard entry was submitted successfully.",
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

export const userUpdated = (position = defaultPosition) => ({
  position: position,
  title: "User Updated",
  description: "Successfully updated user details.",
  status: "success",
  duration: 9000,
  isClosable: true,
});
