import { NextApiRequest, NextApiResponse } from "next";

import { TimeList } from "@common/timeList";
import { TODAY_CUSTOM_EN } from "@common/timeData";
import { AppointmentReducer } from "@common/appointmentReducer";
import { LAYOUT_DAY, DATE_APOINTMENTS, DATE_CLOSED_TIME } from "@ddbb/prisma.queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let role: "admin" | "user" | undefined = undefined;

	if (req.body !== "") role = JSON.parse(req.body).role;

	const OP_LAYOUT = await LAYOUT_DAY(TODAY_CUSTOM_EN);

	const TODAY_APOINTMENTS = await DATE_APOINTMENTS(TODAY_CUSTOM_EN);

	const TODAY_CLOSED_TIME = await DATE_CLOSED_TIME(TODAY_CUSTOM_EN);

	const TODAY_LIST = TimeList(OP_LAYOUT, TODAY_APOINTMENTS, TODAY_CLOSED_TIME);

	const PROCESS_TODAY = AppointmentReducer(TODAY_LIST, role);

	res.status(200).json(PROCESS_TODAY);
}
