import { NextApiRequest, NextApiResponse } from "next";

import { TimeList } from "@common/timeList";
import { week, UTC_TODAY, TODAY } from "@common/timeData"
import { AppointmentReducer } from "@common/appointmentReducer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

		const TODAY_LIST = TimeList(OPENING_CLOSING, TODAY_APOINTMENTS, TODAY_CLOSED_TIME);
		const PROCESS_TODAY = AppointmentReducer(TODAY_LIST)

		res.status(200).json(PROCESS_TODAY);
}
