import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
//utils
import { prisma } from '../../../lib/prisma';
//providers
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import FacebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} = process.env;

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID!,
      clientSecret: DISCORD_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: FACEBOOK_CLIENT_ID!,
      clientSecret: FACEBOOK_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: GITHUB_CLIENT_ID!,
      clientSecret: GITHUB_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      delete user.password;
      delete user.emailVerified;
      session.user = {
        ...session.user,
        id: user.id,
        username: user.username,
      };
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
