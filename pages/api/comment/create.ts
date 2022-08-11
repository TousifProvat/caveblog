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

    const { post, message, parentId = null } = req.body;

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
          user: {
            connect: {
              id: session.user?.id!,
            },
          },
          post: {
            connect: {
              id: post,
            },
          },
          parent: {
            connect: {
              id: parentId,
            },
          },
          body: message,
        },
      });
    } else {
      newComment = await prisma.comment.create({
        data: {
          user: {
            connect: {
              id: session.user?.id!,
            },
          },
          post: {
            connect: {
              id: post,
            },
          },
          body: message,
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
