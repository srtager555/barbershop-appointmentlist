import { NextApiResponse, NextApiRequest } from "next";


export default async function MakeAppointment(req: NextApiRequest, res: NextApiResponse) {
  const { time, user_id, date, createNewAppoint }: AppointAPIBody = JSON.parse(req.body)
  let data;

  if (createNewAppoint) {
    await Prisma?.appointments.delete({
      where: {
        user_id
      }
    })
  }

  const isThereAnAppointment = await Prisma?.appointments.findUnique({
    where: {
      user_id,
    }
  })

  if (isThereAnAppointment) data = { hasAppointment: true }
  else {
    data = await Prisma?.appointments.create({
      data: {
        time,
        user_id,
        date
      }
    })
  }
  
  res.status(200).json(data)
}