import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    //user will be replaced by req.userid
    const { user, post } = req.body;

    if (!user || !post)
      return res.status(400).json({ message: 'Invalid request' });

    const postExist = await prisma.post.findUnique({
      where: {
        id: Number(post),
      },
    });

    if (!postExist)
      return res.status(400).json({
        message: 'Invalid Request',
      });

    const newBookmark = await prisma.bookmark.create({
      data: {
        userId: user,
        postId: post,
      },
    });

    return res.status(201).json({
      bookmark: newBookmark,
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong!' });
  }
}
