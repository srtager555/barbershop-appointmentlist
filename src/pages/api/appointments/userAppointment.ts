import { isExpiretAppointment } from "@common/expireAppointment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function UserAppointment(req: NextApiRequest, res: NextApiResponse) {
	const { user_id }: { user_id: user_id } = JSON.parse(req.body);

	if (user_id) {
		const appointment: rawAppointments | null | undefined =
			await Prisma?.appointments.findUnique({
				where: {
					user_id,
				},
			});

		const expire = isExpiretAppointment(appointment);

		res.status(200).json({
			data: appointment,
			expire,
		});
	}
}
