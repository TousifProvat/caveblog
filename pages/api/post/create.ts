import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

const slugGenerator = (name: string) => {
  let slug = name.trim().replaceAll(' ', '-').toLowerCase();
  return slug;
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    //user will be replaced by req.userid
    const { title, body } = req.body;
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        message: 'Unauthorized Access',
      });
    }

    if (!title || !body)
      return res.status(400).json({ message: 'Invalid request' });

    const titleExist = await prisma.post.findUnique({
      where: {
        title,
      },
    });

    if (titleExist)
      return res.status(409).json({
        message: 'same title exists',
      });

    const newPost = await prisma.post.create({
      data: {
        authorId: String(session.user?.id),
        title,
        body,
        slug: slugGenerator(title),
      },
    });

    return res.status(201).json({
      post: newPost,
      message: 'Post Created Successfully',
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong!' });
  }
}
