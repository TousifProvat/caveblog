import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const session = await getSession({ req });

    if (!session || !session?.user?.id)
      return res.status(401).json({ message: 'Unauthorized Access' });

    const { postId }: { postId: number } = req.body;

    if (!postId) return res.status(400).json({ message: 'Invalid request' });

    const newStar = await prisma.star.create({
      data: {
        userId: session.user.id,
        postId: postId,
      },
    });

    return res.status(201).json({
      star: newStar,
      message: 'Starred Successfully',
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong!' });
  }
}
