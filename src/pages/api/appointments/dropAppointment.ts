import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@ddbb/prismadb";

export default async function DropAppointment(req: NextApiRequest, res: NextApiResponse) {
	const { user_id } = JSON.parse(req.body);

	const DROP = await Prisma?.appointments.delete({
		where: {
			user_id,
		},
	});

	res.status(200).json(DROP);
}
