/**
 * @description This function will removed the first closed times from the data
 * @param  {appointmentData[]} data An array with the data from appointments
 * @returns {appointmentData[]} Will return the appointment array without the first closed times
 */
export function AppointmentReducer(
	data: Array<rawAppointmentData>,
	rol: "admin" | "user" | undefined
): appointmentData[] | "closed" {
	const OpeningTime = data.find((el) => el.isOpening === true);
	let OpeningTimeIndex: number;
	let ClosingTimeIndex: number;
	let ArrayClosedTime: appointmentData[] = [];
	let DATA_process: appointmentData[];

	// here will remove the first hour closed and the last hours closed
	if (OpeningTime) {
		OpeningTimeIndex = data.indexOf(OpeningTime);
		data = data.splice(OpeningTimeIndex);
	}

	const ClosingTime = data.find((el) => el.isClosing === true);

	if (ClosingTime) {
		ClosingTimeIndex = data.indexOf(ClosingTime);
		data.splice(ClosingTimeIndex + 1);
	}

	DATA_process = data.map((el) => {
		return {
			id: el.id,
			time: el.time,
			state: el.state,
			user_id: el.user_id,
		};
	});

	DATA_process.forEach((element) => {
		const CLOSED_STATE = ["open", "busy"].every((el) => element.state != el);

		if (rol != "admin") {
			if (ArrayClosedTime.length > 0) {
				if (CLOSED_STATE) return ArrayClosedTime.push(element);

				const startClosedTime = DATA_process.indexOf(ArrayClosedTime[0]);

				DATA_process.splice(startClosedTime, ArrayClosedTime.length, {
					id: ArrayClosedTime[0].id,
					time:
						ArrayClosedTime.length === 1
							? ArrayClosedTime[0].time
							: `${ArrayClosedTime[0].time} - ${
									ArrayClosedTime[ArrayClosedTime.length - 1].time
							  }`,
					state: "close",
					user_id: null,
				});

				ArrayClosedTime = [];
			} else if (element.state === "close") ArrayClosedTime.push(element);
		}
	});

	return DATA_process.every((el) => el.state === "close") ? "closed" : DATA_process;
}
