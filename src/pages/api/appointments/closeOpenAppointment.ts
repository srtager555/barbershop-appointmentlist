import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@ddbb/prismadb";

interface body {
	date: string;
	time: time;
}

export default async function HandlerCloseOpenAppointment(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { date, time }: body = JSON.parse(req.body);

	const CLOSED = await Prisma.custom_closed_time.findMany({
		where: {
			time,
			date,
		},
	});

	if (CLOSED.length > 0) {
		const REMOVE = await Prisma.custom_closed_time.deleteMany({
			where: {
				time,
				date,
			},
		});

		if (REMOVE) res.status(200).json("Se ha abierto la cita con exito");
		else res.status(500).json("No se ha podido abrir la cita");
	} else {
		const CLOSE = await Prisma.custom_closed_time.create({
			data: {
				time,
				date,
			},
		});

		if (CLOSE) {
			res.status(200).json("Se ha cerrado la cita con exito");
		} else res.status(500).json("No se ha podido cerrar la cita");
	}
}
