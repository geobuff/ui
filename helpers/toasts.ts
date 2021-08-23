import { ToastPosition, UseToastOptions } from "@chakra-ui/react";

const defaultPosition = "bottom-right";

export const entrySubmitted = (
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: "Leaderboard Entry Submitted",
  description: "Your leaderboard entry was submitted successfully.",
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const increaseXP = (
  increase: number,
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  description: `+${increase} XP`,
  status: "info",
  duration: 9000,
  isClosable: true,
});

export const levelUp = (
  newLevel: number,
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: "Congratulations!",
  description: `You've reached level ${newLevel}.`,
  status: "info",
  duration: 9000,
  isClosable: true,
});

export const userUpdated = (
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: "User Updated",
  description: "Successfully updated user details.",
  status: "success",
  duration: 9000,
  isClosable: true,
});
