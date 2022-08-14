import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') return res.status(405).end();
  const { postId } = req.body;

  try {
    const session = await getSession({ req });

    if (!session || !session?.user?.id)
      return res.status(401).json({ message: 'Unauthorized Access' });

    const bookmark = await prisma.bookmark.findFirst({
      where: {
        postId: postId,
        userId: session.user.id,
      },
    });

    if (!bookmark)
      return res.status(404).json({ message: 'Bookmark Not Found' });

    const deletedbookmark = await prisma.bookmark.delete({
      where: {
        id: bookmark.id,
      },
    });

    return res.status(200).json({
      bookmark: deletedbookmark,
      message: 'Deleted Successfully',
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong!' });
  }
}
