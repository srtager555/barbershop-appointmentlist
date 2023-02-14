import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    const TODAY_APOINTMENTS = await Prisma?.apoint_today.findMany()
  
    res.status(200).json(TODAY_APOINTMENTS)
  } else {
    const {} = req.body
  }
} 