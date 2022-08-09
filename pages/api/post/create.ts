import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';
import { nanoid } from 'nanoid';

const slugGenerator = (name: string) => {
  let slug = name
    .trim()
    .replaceAll(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '-')
    .replaceAll(' ', '-')
    .toLowerCase();
  return slug;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

    let slug = slugGenerator(title);

    const titleExist = await prisma.post.findFirst({
      where: {
        title,
      },
    });

    if (titleExist) {
      slug += nanoid(5);
    }

    console.log(slug);

    const newPost = await prisma.post.create({
      data: {
        authorId: String(session.user?.id),
        title,
        body,
        slug,
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
