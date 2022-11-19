import React, { FC } from "react";

import { Box, keyframes } from "@chakra-ui/react";

import useRandomInterval from "../../hooks/useRandomInterval";

const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

const range = (start: number, end: number, step = 1): number[] => {
  const output: number[] = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

interface SparkleStyle {
  top: string;
  left: string;
}

interface SparkleBase {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: SparkleStyle;
}

const generateSparkle = (color: string): SparkleBase => {
  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: random(0, 100) + "%",
      left: random(0, 100) + "%",
    },
  };
};

interface SparklesProps {
  color?: string;
  showSparkles?: boolean;
  [x: string]: any;
}

const Sparkles: FC<SparklesProps> = ({
  color = "#FFC700",
  showSparkles = true,
  children = null,
  ...delegated
}) => {
  const [sparkles, setSparkles] = React.useState(() => {
    return range(0, 3).map(() => generateSparkle(color));
  });

  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color);
      const now = Date.now();
      const nextSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    200,
    600
  );

  return (
    <Box position="relative" display="inline-block" {...delegated}>
      {showSparkles &&
        sparkles.map((sparkle) => (
          <Sparkle
            key={sparkle.id}
            color={sparkle.color}
            size={sparkle.size}
            style={sparkle.style}
          />
        ))}
      <Box as="strong" fontWeight="bold" position="relative" zIndex={100}>
        {children}
      </Box>
    </Box>
  );
};

const comeInOut = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
`;

interface SparkleProps {
  size: string | number;
  color: string;
  style?: object;
}

const Sparkle: FC<SparkleProps> = ({ size, color, style }) => {
  const path =
    "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";

  return (
    <Box
      as="span"
      position="absolute"
      display="block"
      animation={`${comeInOut} 700ms forwards`}
      style={style}
    >
      <svg
        display="block"
        width={size}
        height={size}
        viewBox="0 0 68 68"
        fill="none"
        style={{ animation: `${spin} 1000ms linear` }}
      >
        <path d={path} fill={color} />
      </svg>
    </Box>
  );
};

export default Sparkles;
