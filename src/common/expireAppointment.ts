import { CURRENT_HOUR, months, monthsEnglish, TODAY } from "@common/timeData";
import { TIME_LIST } from "@common/timeData";

export function isExpiretAppointment(element: rawAppointments | undefined | null) {
	if (!element) return undefined;

	// changed the month language to english
	const DATE_DATA = element.date.split(" ");
	const MONTH_INDEX = months.indexOf(DATE_DATA[0]);
	const DATE_CHANGED = element.date.replace(DATE_DATA[0], monthsEnglish[MONTH_INDEX]);

	const appointDate = new Date(DATE_CHANGED);

	const CONDITIONS = [
		appointDate.getFullYear() < TODAY.getFullYear(),
		appointDate.getMonth() < TODAY.getMonth(),
		appointDate.getDate() < TODAY.getDate(),
		appointDate.getDate() === TODAY.getDate() &&
			TIME_LIST.indexOf(element.time) < TIME_LIST.indexOf(CURRENT_HOUR()),
	];

	return CONDITIONS.some((el) => el === true);
}
