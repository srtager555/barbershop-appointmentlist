import Prisma from "@ddbb/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, phone, password } = req.body

  const exists = await Prisma.users.findUnique({
    where: {
      phone,
    },
  });

  if (exists) {
    res.status(400).send("User already exists");
  } else {
    const user = await Prisma.users.create({
      data: {
        name,
        phone,
        password: await hash(password, 10),
      },
    });
    res.status(200).json(user);
  }
}