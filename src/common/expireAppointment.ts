import { CURRENT_HOUR, months, monthsEnglish, TODAY } from "@common/timeData";
import { TIME_LIST } from "@common/timeData";

export function isExpiretAppointment(element: rawAppointments | undefined | null) {
	if (!element) return undefined;

	const appointDate = new Date(element.date);

	const CONDITIONS = [
		appointDate.getFullYear() < TODAY.getFullYear(),
		appointDate.getMonth() < TODAY.getMonth(),
		appointDate.getDate() < TODAY.getDate(),
		appointDate.getDate() === TODAY.getDate() &&
			TIME_LIST.indexOf(element.time) < TIME_LIST.indexOf(CURRENT_HOUR()),
	];

	return CONDITIONS.some((el) => el === true);
}
