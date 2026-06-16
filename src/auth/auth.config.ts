import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { bearer } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { sharedPool } from '../prisma/prisma.pool';

const prisma = new PrismaClient({ adapter: new PrismaPg(sharedPool) });

export const authExtensions = {
  sendEmail: null as
    | null
    | ((to: string, url: string, name: string) => Promise<void>),
};

export const auth = betterAuth({
  baseURL: process.env.BASE_URL,

  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  emailAndPassword: {
    enabled: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    async sendVerificationEmail({ user, url }) {
      if (authExtensions.sendEmail) {
        await authExtensions.sendEmail(user.email, url, user.name);
      } else {
        console.warn('Email extension hook not registered yet.');
      }
    },
  },

  plugins: [bearer()],

  hooks: {},

  trustedOrigins: [],

  advanced: {
    disableOriginCheck: process.env.NODE_ENV !== 'production',
    useSecureCookies: process.env.NODE_ENV === 'production',
  },
});
