import { NextApiRequest, NextApiResponse } from "next";

import { TimeList } from "@common/timeList";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { date } = req.body


  res.status(200).json({ lol: "ok" })

}