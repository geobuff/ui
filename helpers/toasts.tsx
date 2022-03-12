import React from "react";
import { ToastPosition, UseToastOptions } from "@chakra-ui/react";

import GeoCoinToast from "../components/GeoCoinToast";

const defaultPosition: ToastPosition = "bottom-right";

export const entrySubmitted = (
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: "Leaderboard Entry Submitted",
  // Disable description on mobile as having both title
  // and description clashes with the retry button
  description:
    position !== "bottom" &&
    "Your leaderboard entry was submitted successfully.",
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const increaseXP = (
  increase: number,
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  duration: 9000,
  render: ({ onClose }) =>
    increase > 0 && <GeoCoinToast onClose={onClose} increase={increase} />,
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

export const avatarUpdated = (
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: "Avatar Updated",
  description: "Successfully updated user avatar.",
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const addedToCart = (
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: "Item Added to Cart",
  description: "Successfully added item to cart.",
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const createTriviaToast = (
  date: string,
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: "Created Trivia",
  description: `Successfully created trivia for ${date}.`,
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const deployUIToast = (
  environment: string,
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: "Deploy UI",
  description: `Successfully deployed ${environment} UI.`,
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const createQuizToast = (
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: "Create Quiz",
  description: "Successfully created new quiz.",
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const ManualTriviaQuestionToast = (
  type: "Create" | "Edit" = "Create",
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: `${type} Manual Trivia Question`,
  description: `Successfully ${type.toLowerCase()} new trivia question.`,
  status: "success",
  duration: 9000,
  isClosable: true,
});
