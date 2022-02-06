export interface CreateQuizFormSubmit {
  typeId: number;
  badgeId: number;
  continentId: number;
  country: string;
  singular: string;
  name: string;
  maxScore: number;
  time: number;
  mapSVG: string;
  imageURL: string;
  verb: string;
  apiPath: string;
  route: string;
  hasLeaderboard: boolean;
  hasGrouping: boolean;
  hasFlags: boolean;
}
