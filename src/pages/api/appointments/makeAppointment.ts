import { NextApiResponse, NextApiRequest } from "next";


export default async function MakeAppointment(req: NextApiRequest, res: NextApiResponse) {
  const { time, user_id, date, createNewAppoint }: AppointAPIBody = JSON.parse(req.body)

  const isThereAnAppointment = await Prisma?.appointments.findUnique({
    where: {
      user_id,
    }
  })

  if (!isThereAnAppointment && createNewAppoint) {
    await Prisma?.appointments.delete({
      where: {
        user_id
      }
    })

    const data = await Prisma?.appointments.create({
      data: {
        time,
        user_id,
        date
      }
    })

    res.status(200).json(data)
  }
  
  res.status(200).json({ hasAppointment: true, time, user_id, date })
}