export interface DecodedToken {
  userId: number;
  avatarId: number;
  avatarName: string;
  avatarImageUrl: string;
  avatarBackground: string;
  avatarBorder: string;
  username: string;
  email: string;
  countryCode: string;
  xp: number;
  isPremium: boolean;
  stripeSessionId: string;
  exp: number;
}
