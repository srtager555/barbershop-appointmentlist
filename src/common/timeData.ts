export const week = ["Dom", "Lun", "Mar", "Mier", "Jue", "Vier", "Sab"];

export const months = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre",
];


export const TODAY = new Date();

// example: December 15 2023
export const TODAY_CUSTOM = `${months[TODAY.getMonth()]} ${TODAY.getDate()} ${TODAY.getFullYear()}`;

export const UTC_TODAY = `${months[TODAY.getUTCMonth()]} ${TODAY.getUTCDate()} ${TODAY.getUTCFullYear()}}`;


export const CURRENT_HOUR = () => {
	const time = new Date()
	const get_minutes = time.getMinutes()

	let minute;

	if (get_minutes < 20) minute = "00"
	else if (get_minutes < 40) minute = "20"
	else minute = "40"

	// example: 00"20 || 17"40
	return `${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}"${minute}`
}