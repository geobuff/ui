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

export const regenerateTriviaToast = (
  date: string,
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: "Regenerate Trivia",
  description: `Successfully created new trivia for ${date}.`,
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const clearOldTriviaToast = (
  newTriviaCount: number,
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: "Clear Old Trivia",
  description: `Successfully deleted all trivia older than ${newTriviaCount} days old.`,
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

export const quizToast = (
  type: "Create" | "Edit" = "Create",
  action: "created" | "edited" = "created",
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: `${type} Quiz`,
  description: `Successfully ${action} quiz.`,
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const manualTriviaQuestionToast = (
  type: "Create" | "Edit" = "Create",
  action: "created" | "edited" = "created",
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: `${type} Manual Trivia Question`,
  description: `Successfully ${action} trivia question.`,
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const createCommunityQuizToast = (
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: "Create Community Quiz",
  description: `Successfully created community quiz.`,
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const editCommunityQuizToast = (
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: "Edit Community Quiz",
  description: "Successfully edited community quiz.",
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const deleteCommunityQuizToast = (
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: "Delete Community Quiz",
  description: "Successfully deleted community quiz.",
  status: "success",
  duration: 9000,
  isClosable: true,
});

export const copyCommunityQuizLinkToast = (
  name: string,
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: `Copy ${name} Link`,
  description: `Successfully copied link to clipboard.`,
  status: "success",
  duration: 6000,
  isClosable: true,
});

export const copyTriviaScoreToast = (
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  title: "Copy Score",
  description: "Successfully copied score to clipboard.",
  status: "success",
  duration: 6000,
  isClosable: true,
});
