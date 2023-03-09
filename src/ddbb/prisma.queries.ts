import { week } from "@common/timeData";
import { Prisma } from "./prismadb";

export const LAYOUT_DAY = async (date: string) => {
	const DAY_NUMBER = new Date(date).getDay();

	const BASE =
		(await Prisma.layout_day.findUnique({
			where: {
				day: week[DAY_NUMBER],
			},
		})) ||
		(await Prisma.layout_day.findUnique({
			where: {
				day: "default",
			},
		}));

	const CUSTOM_BASE = await Prisma.custom_oc.findUnique({
		where: {
			date,
		},
	});

	return CUSTOM_BASE ? CUSTOM_BASE : BASE;
};

export const DATE_APOINTMENTS = async (date: string) =>
	await Prisma.appointments.findMany({
		where: {
			date: date,
		},
	});

export const DATE_CLOSED_TIME = async (date: string) =>
	await Prisma.custom_closed_time.findMany({
		where: {
			date: date,
		},
	});
