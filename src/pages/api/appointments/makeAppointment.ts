import { CURRENT_HOUR, months, monthsEnglish, TODAY } from "@common/timeData";
import { TIME_LIST } from "@common/timeList";
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

      // changed the month language to english
      const DATE_DATA = element.date.split(" ")
      const MONTH_INDEX = months.indexOf(DATE_DATA[0])
      const DATE_CHANGED = element.date.replace(DATE_DATA[0], monthsEnglish[MONTH_INDEX]);

			const appointDate = new Date(DATE_CHANGED);

			const CONDITIONS = [
				appointDate.getFullYear() < TODAY.getFullYear(),
				appointDate.getMonth() < TODAY.getMonth(),
				appointDate.getDate() < TODAY.getDate(),
				TIME_LIST.indexOf(element.time) < TIME_LIST.indexOf(CURRENT_HOUR()),
			];

			const RESULT = CONDITIONS.some((el) => el === true);

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
