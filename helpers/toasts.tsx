import React from "react";

import { LottieToast } from "@geobuff/buff-ui/components";

import { AlertStatus, ToastPosition, UseToastOptions } from "@chakra-ui/react";

import coinSpin from "../lotties/coin-spin.json";

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
  message: string,
  ariaLabel: string,
  increase: number,
  position: ToastPosition = defaultPosition
): UseToastOptions => ({
  position: position,
  duration: 9000,
  render: ({ onClose }) =>
    increase > 0 && (
      <LottieToast
        animationData={coinSpin}
        message={message}
        ariaLabel={ariaLabel}
        onClose={onClose}
      />
    ),
});
