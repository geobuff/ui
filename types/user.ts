export interface User {
  id: number;
  avatarId: number;
  username: string;
  email: string;
  countryCode: string;
  xp: number;
  isPremium?: boolean;
  picture?: string;
  avatarName?: string;
  avatarDescription?: string;
  avatarPrimaryImageUrl?: string;
  avatarSecondaryImageUrl?: string;
  token?: string;
  joined?: string;
}
