import { flags } from "@geobuff/flags";

export const getFlagsByCategory = (category: string): string[] => {
  if (category === "world") {
    return Object.keys(flags).filter((flag) => flag.length === 2);
  }

  return Object.keys(flags).filter(
    (flag) => flag.slice(0, 2) === category && flag.length !== 2
  );
};
