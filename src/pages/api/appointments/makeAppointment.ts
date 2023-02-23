import { NextApiResponse, NextApiRequest } from "next";

export default async function MakeAppointment(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json("ok")
}