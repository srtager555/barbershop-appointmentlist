import { NextApiRequest, NextApiResponse } from "next";

import { TimeList } from "@common/timeList";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (!req.body) {
		const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

		const TODAY = new Date();
		const UTC_TODAY = `${week[TODAY.getUTCDay()]} ${TODAY.getUTCDate} ${TODAY.getUTCMonth}M ${
			TODAY.getUTCFullYear
		}}`;

		let OPENING_CLOSING =
			(await Prisma?.custom_oc.findUnique({
				where: {
					date: UTC_TODAY,
				},
			})) ||
			(await Prisma?.custom_oc.findUnique({
				where: {
					date: "default",
				},
			}));

		const TODAY_APOINTMENTS = await Prisma?.appointments.findMany({
			where: {
				date: UTC_TODAY,
			},
		});

		const TODAY_CLOSED_TIME = await Prisma?.custom_closed_time.findMany({
			where: {
				date: UTC_TODAY,
			},
		});

		const PROCESS_TODAY = TimeList(OPENING_CLOSING, TODAY_APOINTMENTS, TODAY_CLOSED_TIME);

		res.status(200).json(PROCESS_TODAY);
	} else {
		const {} = req.body;
	}
}
