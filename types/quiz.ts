import { NullInt } from "./null-int";

export interface Quiz {
  id: number;
  typeId: number;
  badgeId: number;
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
