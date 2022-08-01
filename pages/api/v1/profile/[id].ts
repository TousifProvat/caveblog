import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

interface profileTypes {
  id: string;
  userId: string;
  headline: string;
  bio: string;
  website: string;
  location: string;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const { id } = req.query;
    const profile: profileTypes | null = await prisma.profile.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            username: true,
            email: true,
            createdAt: true,
          },
        },
      },
    });

    if (!profile)
      return res.status(404).json({ message: `profile doesn't exist` });

    return res.status(200).json({ profile });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
