export const handlerCloseAndOpenAnAppointment = async (date: string, time: time) => {
	await fetch("/api/appointments/closeOpenAppointment", {
		method: "POST",
		body: JSON.stringify({
			date,
			time,
		}),
	});
};
