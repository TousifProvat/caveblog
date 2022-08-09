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

    if (!session)
      return res.status(401).json({
        message: 'Unauthorized Access',
      });

    const { post, comment, parentId = null } = req.body;

    if (!post) return res.status(400).json({ message: 'Invalid request' });

    const postExist = await prisma.post.findUnique({
      where: {
        id: post,
      },
    });

    if (!postExist)
      return res.status(400).json({
        message: 'Invalid Request',
      });

    let newComment;
    if (parentId) {
      newComment = await prisma.comment.create({
        data: {
          userId: session.user?.id!,
          postId: post,
          parentId,
          body: comment,
        },
      });
    } else {
      newComment = await prisma.comment.create({
        data: {
          userId: session.user?.id!,
          postId: post,
          body: comment,
        },
      });
    }

    return res.status(201).json({
      comment: newComment,
      message: 'Comment Successfull',
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong!' });
  }
}
