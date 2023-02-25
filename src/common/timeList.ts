import { TIME_LIST } from "./timeData";

export function TimeList(
	OpeningClosing: { opening: Time; closing: Time; closed: boolean } | undefined | null,
	appointments: rawAppointments[] | undefined,
	closedTime: customClosedTime[] | undefined
): Array<appointmentData> {
	if (!OpeningClosing) return [];

	const OPENING_index_time = TIME_LIST.indexOf(OpeningClosing.opening.replace(":", '"'));
	const CLOSING_index_time = TIME_LIST.indexOf(OpeningClosing.closing.replace(":", '"'));

	const RESULT: Array<appointmentData> = TIME_LIST.map((element, index) => {
		let state: state = "open";
		let user_id: user_id = null;

		const IS_CLOSED = closedTime?.find((close) => close.time === element);
		const IS_BUSY: rawAppointments | undefined = appointments?.find(
			(appoint) => appoint.time === element
		);

		if (OPENING_index_time > index) state = "close";
		else if (CLOSING_index_time <= index) state = "close";
		else if (IS_CLOSED) state = "close";
		else if (IS_BUSY) {
			state = "busy";
			user_id = IS_BUSY.user_id;
		}

		return {
			id: index,
			time: element,
			state,
			user_id,
		};
	});

	return RESULT;
}
