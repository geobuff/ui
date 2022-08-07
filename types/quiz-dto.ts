import { NullInt } from "./null-int";
import { SVGBase } from "./svg-base";

export interface QuizDto {
  id: number;
  typeId: number;
  badgeId: NullInt;
  continentId: NullInt;
  country: string;
  singular: string;
  name: string;
  maxScore: number;
  time: number;
  map?: SVGBase;
  mapName?: string;
  imageUrl: string;
  plural: string;
  apiPath: string;
  route: string;
  hasLeaderboard: boolean;
  hasGrouping: boolean;
  hasFlags: boolean;
  enabled: boolean;
}
