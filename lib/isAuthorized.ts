import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { prisma } from './prisma';

export default async function (req: NextRequest) {
  const baseAuth = req.headers.get('Authorization');
  if (!baseAuth) return false;

  const JwtToken = baseAuth.split(' ')[1];

  //   const decoded = jwt.verify(JwtToken, 'secretkey');

  console.log(JwtToken);
  //   const user = await prisma.user.findUnique({
  //     where: {
  //       id: String(decoded.id),
  //     },
  //   });

  //   if (!user) return false;

  return true;
}
