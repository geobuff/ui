import React from "react";

import { AlertStatus, ToastPosition, UseToastOptions } from "@chakra-ui/react";

import GeoCoinToast from "../components/GeoCoinToast";

const defaultPosition: ToastPosition = "bottom-right";

export const genericToast = (
  title: string,
  description?: string,
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

export const increaseXPToast = (
  increase: number,
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  duration: 9000,
  render: ({ onClose }) =>
    increase > 0 && <GeoCoinToast onClose={onClose} increase={increase} />,
});
