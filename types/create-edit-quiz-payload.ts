import { NullInt } from "./null-int";

export interface CreateEditQuizPayload {
  typeId: number;
  badgeId: NullInt;
  continentId: NullInt;
  country: string;
  singular: string;
  name: string;
  maxScore: number;
  time: number;
  mapSVG: string;
  imageUrl: string;
  plural: string;
  apiPath: string;
  route: string;
  hasLeaderboard: boolean;
  hasGrouping: boolean;
  hasFlags: boolean;
  enabled: boolean;
}
