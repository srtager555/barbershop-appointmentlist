import { NextApiRequest, NextApiResponse } from "next";

import { TimeList } from "@common/timeList";
import { week, TODAY_CUSTOM, TODAY } from "@common/timeData"
import { AppointmentReducer } from "@common/appointmentReducer";
import { OPENING_CLOSING, DATE_APOINTMENTS, DATE_CLOSED_TIME } from "@ddbb/prisma.queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
		const OP_LAYOUT = await OPENING_CLOSING(TODAY.getDay())

		const TODAY_APOINTMENTS = await DATE_APOINTMENTS(TODAY_CUSTOM)

		const TODAY_CLOSED_TIME = await DATE_CLOSED_TIME(TODAY_CUSTOM)

		const TODAY_LIST = TimeList(OP_LAYOUT, TODAY_APOINTMENTS, TODAY_CLOSED_TIME);
		const PROCESS_TODAY = AppointmentReducer(TODAY_LIST)

		res.status(200).json(PROCESS_TODAY);
}
