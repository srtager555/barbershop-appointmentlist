interface isExpiredAppopintment {
	time: time;
	date?: string;
	availableTime: any;
	setAvailableTime: any;
}

import { CURRENT_HOUR, TIME_LIST, TODAY_CUSTOM } from "@common/timeData";

export const VALID_TIME_TO_APPOINT = (time: time, date?: string) => {
	const CURRENT_TIME_INDEX = TIME_LIST.indexOf(CURRENT_HOUR());
	const BTN_TIME_INDEX = TIME_LIST.indexOf(time);
	const threshold = 3; // Voy a dejar de trabajar en este feature porque es bastante abtracto por ahora

	if (date === TODAY_CUSTOM) if (BTN_TIME_INDEX < CURRENT_TIME_INDEX) return true;

	return false;
};

export const VALITD_TIME_LISTENER = ({
	time,
	date,
	availableTime,
	setAvailableTime,
}: isExpiredAppopintment) => {
	setAvailableTime(VALID_TIME_TO_APPOINT(time, date));

	return setInterval(() => {
		const VALID = VALID_TIME_TO_APPOINT(time, date);

		if (VALID != availableTime) setAvailableTime(VALID);
	}, 10000);
};
