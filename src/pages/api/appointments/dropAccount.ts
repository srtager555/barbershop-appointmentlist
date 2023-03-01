import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@ddbb/prismadb";

export default async function handlerDropAccount(req: NextApiRequest, res: NextApiResponse) {
	let delete_appoitnment: rawAppointments | string | undefined = "sin reservas";
	const user_id: number = JSON.parse(req.body).user_id;

	// const { data } = await fetch("/api/appointments/userAppointment", {
	// 	method: "POST",
	// 	body: JSON.stringify({ user_id }),
	// }).then((data) => data.json());

	const appoint = await Prisma.appointments.findUnique({
		where: {
			user_id,
		},
	});

	if (appoint) {
		delete_appoitnment = await Prisma?.appointments.delete({
			where: {
				user_id,
			},
		});
	}

	const DELETE = await Prisma?.users.delete({
		where: {
			id: user_id,
		},
	});

	res.redirect("/citas").json({
		user: DELETE,
		appointment: delete_appoitnment,
		message: "usuario eliminado",
	});
}
