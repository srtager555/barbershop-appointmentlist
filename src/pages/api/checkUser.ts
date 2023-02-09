// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Prisma from '@ddbb/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phoneNumber } = req.body;

  const exists = await Prisma.users.findUnique({
    where: {
      phone: phoneNumber,
    },
  });

  res.status(200).json(exists);
}
