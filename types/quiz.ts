export interface Quiz {
  id: number;
  type: number;
  name: string;
  maxScore: number;
  time: number;
  mapSVG: string;
  imageUrl: string;
  verb: string;
  apiPath: string;
  route: string;
  hasLeaderboard: boolean;
  hasGrouping: boolean;
  hasFlags: boolean;
  enabled: boolean;
}