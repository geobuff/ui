export interface AuthUser {
  id: number;
  avatarId: number;
  username: string;
  email: string;
  countryCode: string;
  xp: number;
  isAdmin: boolean;
  isPremium: boolean;
  avatarName: string;
  avatarDescription: string;
  avatarPrimaryImageUrl: string;
  avatarSecondaryImageUrl: string;
  authConfig: any;
  joined: string;
}
