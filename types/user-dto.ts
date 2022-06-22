export interface UserDto {
  id: number;
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
  joined: string;
}
