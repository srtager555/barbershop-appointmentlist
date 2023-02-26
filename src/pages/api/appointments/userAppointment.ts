import { isExpiretAppointment } from "@common/expireAppointment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { user_id } = JSON.parse(req.body);

	const appointment: rawAppointments | null | undefined = await Prisma?.appointments.findUnique({
		where: {
			user_id,
		},
	});

	const expire = isExpiretAppointment(appointment);

	res.status(200).json({
		appointment,
		expire,
	});
}
