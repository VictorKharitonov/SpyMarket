import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import SequelizeAdapter from '@auth/sequelize-adapter';
import type { Adapter } from 'next-auth/adapters';
import sequelize from '@/db/models';

const adapter = SequelizeAdapter(sequelize) as Adapter;

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    })
  ],
  session: {
    strategy: 'jwt'
  },
  adapter: adapter,
  pages: {
    signIn: '/'
  }
};
