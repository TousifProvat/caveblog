import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const { id, user } = req.query;

    if (!id) return res.status(404).json({ message: 'Post Not Found' });

    const bookmarks = await prisma.bookmark.count({
      where: {
        postId: Number(id),
      },
    });

    let bookmarked = false;

    if (user) {
      const isBookmarked = await prisma.bookmark.count({
        where: {
          postId: Number(id),
          userId: String(user),
        },
      });

      bookmarked = isBookmarked ? true : false;
    }

    return res.status(200).json({ bookmarks, bookmarked });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
