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
