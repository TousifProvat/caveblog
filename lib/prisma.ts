import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

//cretes a random username when signing up
prisma.$use(async (params, next) => {
  if (params.model === 'User' && params.action === 'create') {
    params.args.data.username = nanoid(5);
  }
  return next(params);
});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
