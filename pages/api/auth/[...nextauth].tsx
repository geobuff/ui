import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DecodedToken } from "../../../types/decoded-token";
import jwt_decode from "jwt-decode";
import { JWT } from "next-auth/jwt";

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  const payload = {
    token: token.accessToken,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    return {
      ...token,
      error: "RefreshAccessTokenError",
      errorMessage: errorText,
    };
  }

  const data = await response.json();
  const decoded: DecodedToken = jwt_decode(data);
  const user = {
    id: decoded.userId,
    avatarId: decoded.avatarId,
    avatarName: decoded.avatarName,
    avatarDescription: decoded.avatarDescription,
    avatarPrimaryImageUrl: decoded.avatarPrimaryImageUrl,
    avatarSecondaryImageUrl: decoded.avatarPrimaryImageUrl,
    username: decoded.username,
    email: decoded.email,
    countryCode: decoded.countryCode,
    xp: decoded.xp,
    isAdmin: decoded.isAdmin,
    isPremium: decoded.isPremium,
    joined: decoded.joined,
    authConfig: {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    },
  };

  return {
    ...token,
    accessToken: data,
    accessTokenExpires: Date.now() + decoded.exp * 1000,
    user: user,
  };
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const data = await response.json();
        const decoded: DecodedToken = jwt_decode(data);
        const user = {
          id: decoded.userId,
          avatarId: decoded.avatarId,
          avatarName: decoded.avatarName,
          avatarDescription: decoded.avatarDescription,
          avatarPrimaryImageUrl: decoded.avatarPrimaryImageUrl,
          avatarSecondaryImageUrl: decoded.avatarPrimaryImageUrl,
          username: decoded.username,
          email: decoded.email,
          countryCode: decoded.countryCode,
          xp: decoded.xp,
          isAdmin: decoded.isAdmin,
          isPremium: decoded.isPremium,
          joined: decoded.joined,
          expiresAt: Date.now() + decoded.exp * 1000,
          token: data,
          authConfig: {
            headers: {
              Authorization: `Bearer ${data}`,
            },
          },
        };

        return response.ok && user ? user : null;
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SITE_JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;
      session.errorMessage = token.errorMessage;
      return session;
    },
    async jwt({ token, user }) {
      // Initial sign in.
      if (user) {
        return {
          accessToken: user.token,
          accessTokenExpires: user.expiresAt,
          user,
        };
      }

      return Date.now() < token.accessTokenExpires
        ? token
        : refreshAccessToken(token);
    },
  },
  debug: process.env.NEXT_PUBLIC_SITE_ENV === "DEV",
});
