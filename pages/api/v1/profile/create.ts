import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { user, headline, bio, website, location } = req.body;

    const profileExist = await prisma.profile.findUnique({
      where: {
        userId: user,
      },
    });

    if (profileExist)
      return res.status(400).json({
        message: 'Profile already exists for this user.',
      });

    if (!user)
      return res.status(400).json({ message: 'Usder Id must be valid' });
    const profile = await prisma.profile.create({
      data: {
        userId: user,
        headline,
        bio,
        website,
        location,
      },
    });
    return res.status(201).json({
      profile,
      message: 'Profile Created Successfully',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
