export const week = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

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

export const monthsEnglish = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"Octuber",
	"November",
	"December",
];

export const TODAY = new Date();

// example: December 15 2023
export const TODAY_CUSTOM = `${months[TODAY.getMonth()]} ${TODAY.getDate()} ${TODAY.getFullYear()}`;

export const TODAY_CUSTOM_EN = `${
	monthsEnglish[TODAY.getMonth()]
} ${TODAY.getDate()} ${TODAY.getFullYear()}`;

export const UTC_TODAY = `${
	months[TODAY.getUTCMonth()]
} ${TODAY.getUTCDate()} ${TODAY.getUTCFullYear()}}`;

export const CURRENT_HOUR = () => {
	const time = new Date();
	const get_minutes = time.getMinutes();

	let minute;

	if (get_minutes < 20) minute = "00";
	else if (get_minutes < 40) minute = "20";
	else minute = "40";

	// example: 00"20 || 17"40
	return `${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}"${minute}`;
};

export const VALID_TIME_TO_APPOINT = (time: time, date: string) => {
	const CURRENT_TIME_INDEX = TIME_LIST.indexOf(CURRENT_HOUR());
	const BTN_TIME_INDEX = TIME_LIST.indexOf(time);
	const threshold = 3; // Voy a dejar de trabajar en este feature porque es bastante abtracto por ahora

	if (date === TODAY_CUSTOM) if (BTN_TIME_INDEX < CURRENT_TIME_INDEX) return true;

	return false;
};

export const TIME_LIST: ArrayTime = [
	'00"00',
	'00"20',
	'00"40',
	'01"00',
	'01"20',
	'01"40',
	'02"00',
	'02"20',
	'02"40',
	'03"00',
	'03"20',
	'03"40',
	'04"00',
	'04"20',
	'04"40',
	'05"00',
	'05"20',
	'05"40',
	'06"00',
	'06"20',
	'06"40',
	'07"00',
	'07"20',
	'07"40',
	'08"00',
	'08"20',
	'08"40',
	'09"00',
	'09"20',
	'09"40',
	'10"00',
	'10"20',
	'10"40',
	'11"00',
	'11"20',
	'11"40',
	'12"00',
	'12"20',
	'12"40',
	'13"00',
	'13"20',
	'13"40',
	'14"00',
	'14"20',
	'14"40',
	'15"00',
	'15"20',
	'15"40',
	'16"00',
	'16"20',
	'16"40',
	'17"00',
	'17"20',
	'17"40',
	'18"00',
	'18"20',
	'18"40',
	'19"00',
	'19"20',
	'19"40',
	'20"00',
	'20"20',
	'20"40',
	'21"00',
	'21"20',
	'21"40',
	'22"00',
	'22"20',
	'22"40',
	'23"00',
	'23"20',
	'23"40',
	'24"00',
];
