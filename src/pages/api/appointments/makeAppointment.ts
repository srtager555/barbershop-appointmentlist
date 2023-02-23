import { NextApiResponse, NextApiRequest } from "next";

export default async function MakeAppointment(req: NextApiRequest, res: NextApiResponse) {
  const { time, user_id, date }: { time: string; user_id: number; date: string } = req.body

  console.log(time, user_id, date)

  const data = await Prisma?.appointments.create({
    data: {
      time,
      user_id,
      date
    }
  })

  res.status(200).json(data)
}