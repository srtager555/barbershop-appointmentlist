import { NextApiRequest, NextApiResponse } from "next";

import { TimeList } from "@common/timeList";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
		const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

		const TODAY = new Date();
		const UTC_TODAY = `${TODAY.getUTCMonth}M ${TODAY.getUTCDate} ${
			TODAY.getUTCFullYear
		}}`;

		let OPENING_CLOSING =
			(await Prisma?.layout_day.findUnique({
				where: {
					day: week[TODAY.getUTCDay()],
				},
			})) ||
			(await Prisma?.layout_day.findUnique({
				where: {
					day: "default",
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
}
