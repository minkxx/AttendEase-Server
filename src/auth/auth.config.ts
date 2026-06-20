import { betterAuth } from 'better-auth';
import { expo } from '@better-auth/expo';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '../common/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { sharedPool } from '../prisma/prisma.pool';

const prisma = new PrismaClient({ adapter: new PrismaPg(sharedPool) }); // Separate from PrismaService — better-auth requires its own client instance at load time.

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
        throw new Error(
          'EmailService not initialized — sendVerificationEmail called before AuthModule.onModuleInit',
        );
      }
    },
  },

  plugins: [expo()],

  trustedOrigins: [
    process.env.FRONTEND_URL ?? '',
    ...(process.env.NODE_ENV === 'development'
      ? [
          'exp://', // Trust all Expo URLs (prefix matching)
          'exp://**', // Trust all Expo URLs (wildcard matching)
          'exp://192.168.*.*:*/**', // Trust 192.168.x.x IP range with any port and path
        ]
      : []),
  ],

  advanced: {
    disableOriginCheck: process.env.NODE_ENV !== 'production',
    useSecureCookies: process.env.NODE_ENV === 'production',
  },
});
