import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
import { userTypes } from '../../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const { id, user } = req.query;

    if (!id) return res.status(404).json({ message: 'Post Not Found' });

    const stars = await prisma.star.count({
      where: {
        postId: Number(id),
      },
    });

    let starred = false;

    if (user) {
      const isStarred = await prisma.star.count({
        where: {
          postId: Number(id),
          userId: String(user),
        },
      });

      starred = isStarred ? true : false;
    }

    return res.status(200).json({ stars, starred });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
