export interface User {
    id: number;
    avatarId: number;
    username: string;
    email: string;
    countryCode: string;
    xp: number;
    isPremium?: boolean;
    stripeSessionId?: string;
    picture?: string;
    avatarName?: string;
    avatarBackground?: string;
    avatarBorder?: string;
    avatarImageUrl?: string;
    token?: string;
}