export interface DecodedToken {
  userId: number;
  avatarId: number;
  avatarName: string;
  avatarDescription: string;
  avatarPrimaryImageUrl: string;
  avatarSecondaryImageUrl: string;
  username: string;
  email: string;
  countryCode: string;
  xp: number;
  isAdmin: boolean;
  isPremium: boolean;
  joined: string;
  exp: number;
}
