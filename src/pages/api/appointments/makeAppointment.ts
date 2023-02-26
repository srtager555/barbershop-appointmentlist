import { isExpiretAppointment } from "@common/expireAppointment";
import { NextApiResponse, NextApiRequest } from "next";

export default async function MakeAppointment(req: NextApiRequest, res: NextApiResponse) {
	const { time, user_id, date, createNewAppoint }: AppointAPIBody = JSON.parse(req.body);
	let data;

	const handlerDeleteAppointment = async () => {
		await Prisma?.appointments.delete({
			where: {
				user_id,
			},
		});
	};

	if (createNewAppoint) await handlerDeleteAppointment();

	const isThereAnAppointment = await Prisma?.appointments
		.findUnique({
			where: {
				user_id,
			},
		})
		.then(async (element) => {
			if (!element) return false;

			const RESULT = isExpiretAppointment(element);

			if (RESULT) {
				await handlerDeleteAppointment();
				return false;
			}

			return true;
		});

	if (isThereAnAppointment) data = { hasAppointment: true };
	else {
		data = await Prisma?.appointments.create({
			data: {
				time,
				user_id,
				date,
			},
		});
	}

	res.status(200).json(data);
}
