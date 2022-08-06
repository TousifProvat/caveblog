import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const session = await getSession({ req });

    if (!session || !session?.user?.id)
      return res.status(401).json({ message: 'Unauthorized Access' });
    //user will be replaced by req.userid
    const { slug } = req.body;

    if (!slug) return res.status(400).json({ message: 'Invalid request' });

    const postExist = await prisma.post.findUnique({
      where: {
        slug: String(slug),
      },
    });

    if (!postExist)
      return res.status(400).json({
        message: 'Invalid Request',
      });

    const newbookmark = await prisma.bookmark.create({
      data: {
        userId: session.user.id,
        postId: postExist.id,
      },
    });

    return res.status(201).json({
      bookmark: newbookmark,
      message: 'bookmarkred Successfully',
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong!' });
  }
}
