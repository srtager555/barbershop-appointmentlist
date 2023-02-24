import { NextApiRequest, NextApiResponse } from "next";

export default async function DropAppointment(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json("Mañana tengo que terminar esto xd")
}