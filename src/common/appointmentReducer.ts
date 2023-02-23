/**
 * @description This function will removed the first closed times from the data
 * @param  {appointmentData[]} data An array with the data from appointments
 * @returns {appointmentData[]} Will return the appointment array without the first closed times
 */
export function AppointmentReducer(data: Array<appointmentData>): appointmentData[] | "closed" {
	const OpeningTime = data.find((el) => el.state === "open" || el.state === "busy");
	let OpeningTimeIndex: number;
	let lastClosedTimeIndex: number;
	let ArrayClosedTime: appointmentData[] = [];

	// here will remove the first hour closed and the last hours closed
	if (OpeningTime) {
		OpeningTimeIndex = data.indexOf(OpeningTime)
		data = data.splice(OpeningTimeIndex);
	}

	const ClosingTime = data.reverse().find((el) => el.state === "open");

	if (ClosingTime) {
		lastClosedTimeIndex = data.indexOf(ClosingTime);
		data = data.splice(lastClosedTimeIndex - 1).reverse();
	}

	data.forEach((element) => {
		if (ArrayClosedTime.length > 0) {
			if (["open", "busy"].every((el) => element.state != el)) return ArrayClosedTime.push(element);

			const startClosedTime = data.indexOf(ArrayClosedTime[0]);

			data.splice(startClosedTime, ArrayClosedTime.length, {
				id: ArrayClosedTime[0].id,
				time: `${ArrayClosedTime[0].time} - ${
					ArrayClosedTime[ArrayClosedTime.length - 1].time
				}`,
				state: "close",
				user_id: null,
			});

			ArrayClosedTime = [];
		} else if (element.state === "close") ArrayClosedTime.push(element);
	});

	return data.every((el) => el.state === "close") ? "closed" : data;
}
