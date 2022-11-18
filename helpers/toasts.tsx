import React from "react";

import { AlertStatus, ToastPosition, UseToastOptions } from "@chakra-ui/react";

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

export const genericToast = (
  title: string,
  description: string,
  duration = 6000,
  position: ToastPosition = defaultPosition,
  status: AlertStatus = "success"
): UseToastOptions => ({
  position: position,
  title: title,
  description: description,
  status: status,
  duration: duration,
  isClosable: true,
});
