import Prisma from "@ddbb/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phoneNumber, password } = req.body;
  const exists = await Prisma.user.findUnique({
    where: {
      phone: phoneNumber,
    },
  });
  if (exists) {
    res.status(400).send("User already exists");
  } else {
    const user = await Prisma.user.create({
      data: {
        phone: phoneNumber,
        password: await hash(password, 10),
      },
    });
    res.status(200).json(user);
  }
}