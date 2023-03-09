// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@ddbb/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const uid = req.query.uid as unknown as number | undefined;

	if (uid) {
		const exists = await Prisma.users.findUnique({
			where: {
				id: Number(uid),
			},
		});

		if (exists) {
			res.status(200).json({ phone: exists.phone, name: exists.name });
		}
	} else {
		res.status(500).json("No se encontro un usuario");
	}
}
