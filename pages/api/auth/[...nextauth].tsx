import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DecodedToken } from "../../../types/decoded-token";
import jwt_decode from "jwt-decode";

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
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  debug: process.env.NEXT_PUBLIC_SITE_ENV === "DEV",
});
