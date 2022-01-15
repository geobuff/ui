import React from "react";
import { ToastPosition, UseToastOptions } from "@chakra-ui/react";

import GeoCoinToast from "../components/GeoCoinToast";

const defaultPosition: ToastPosition = "bottom-right";

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
  duration: 9000,
  render: ({ onClose }) => (
    <GeoCoinToast onClose={onClose} increase={increase} />
  ),
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
