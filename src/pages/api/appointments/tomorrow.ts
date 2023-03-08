import { NextApiRequest, NextApiResponse } from "next";

import { DATE_APOINTMENTS, DATE_CLOSED_TIME, LAYOUT_DAY } from "@ddbb/prisma.queries";
import { TimeList } from "@common/timeList";
import { AppointmentReducer } from "@common/appointmentReducer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const date: string = JSON.parse(req.body).date;
	const role: "admin" | "user" | undefined = JSON.parse(req.body).role;

	if (!date) res.status(200).json("¿Que haces aquí?");

	const OP_LAYOUT = await LAYOUT_DAY(date);

	const TODAY_APOINTMENTS = await DATE_APOINTMENTS(date);

	const TODAY_CLOSED_TIME = await DATE_CLOSED_TIME(date);

	const TODAY_LIST = TimeList(OP_LAYOUT, TODAY_APOINTMENTS, TODAY_CLOSED_TIME);
	const PROCESS_TODAY = AppointmentReducer(TODAY_LIST, role);

	res.status(200).json(PROCESS_TODAY);
}
