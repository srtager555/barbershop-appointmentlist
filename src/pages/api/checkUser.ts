// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Prisma from '@ddbb/prismadb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phone } = req.body;

  if (phone) {
    const exists = await Prisma.users.findUnique({
      where: {
        phone
      },
    });
  
    res.status(200).json({ exists, phone});
  } else {
    const users = await Prisma.users.findMany()

    res.status(200).json({ hola: "hola", users, number: `xd ${phone}`})
  }
}
