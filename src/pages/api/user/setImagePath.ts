import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@ddbb/prismadb";

export default async function SetImagePath(req: NextApiRequest, res: NextApiResponse) {
	const path: string = JSON.parse(req.body).path;
	const user_id: number = JSON.parse(req.body).user_id;

	await Prisma.users.update({
		where: {
			id: user_id,
		},
		data: {
			image: path,
		},
	});

	res.status(200);
}
