import { week } from "@common/timeData";

export const OPENING_CLOSING = async (n: number) => {
	return (
		(await Prisma?.layout_day.findUnique({
			where: {
				day: week[n],
			},
		})) ||
		(await Prisma?.layout_day.findUnique({
			where: {
				day: "default",
			},
		}))
	);
};

export const DATE_APOINTMENTS = async (date: string) =>
	await Prisma?.appointments.findMany({
		where: {
			date: date,
		},
	});

export const DATE_CLOSED_TIME = async (date: string) =>
	await Prisma?.custom_closed_time.findMany({
		where: {
			date: date,
		},
	});
